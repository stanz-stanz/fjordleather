#!/usr/bin/env node
/**
 * Fjordleather — Local Admin Server
 * Usage: npm run admin
 *
 * Serves Add Product + Edit Product at http://localhost:3001
 * NOT for production — local use only.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 3001;

// ── Tannery list (mirrors data/tanneries.ts) ────────────────────────────────
const TANNERIES = [
  'Artigiano Del Cuoio', 'Badalassi Carlo', 'Conceria La Bretagna',
  'Conceria Walpier', 'Curtiba Ind. Conciaria', 'Il Gabbiano', 'Il Ponte',
  'Italpel', 'La Perla Azzurra', 'Lo Stivale', 'M.P.G. Industria Conciaria',
  'Monteverdi', 'Nuova Albora', 'Orice', 'Puccini Attilio', 'Tempesti',
  'Volpi Concerie', 'WALPIER',
];

const TANNERY_URLS = {
  'Artigiano Del Cuoio':        'http://www.artigiano.it',
  'Conceria La Bretagna':       'http://www.labretagna.com',
  'Conceria Walpier':           'http://www.conceriawalpier.com/',
  'Curtiba Ind. Conciaria':     'http://www.curtiba.it',
  'Il Gabbiano':                'http://conceriailgabbiano.com/',
  'Il Ponte':                   'http://www.conceriailponte.it',
  'La Perla Azzurra':           'http://www.laperlaazzurra.com',
  'Lo Stivale':                 'http://www.lostivale.it',
  'M.P.G. Industria Conciaria': 'http://www.mpg.it',
  'Monteverdi':                 'http://www.conceriamonteverdi.it',
  'Nuova Albora':               'http://gruppoconceriemasini.com/company/nuova-albora/',
  'Orice':                      'http://www.orice.com',
  'Puccini Attilio':            'http://www.conceriapuccini.com',
  'Tempesti':                   'http://www.tempesti.com',
  'Volpi Concerie':             'http://www.volpi.it',
  'WALPIER':                    'http://www.conceriawalpier.com/',
};

const CATEGORIES = ['bags', 'travel-duffles', 'wallets', 'coin-pouches', 'accessories'];
const CURRENCIES = ['EUR', 'DKK', 'USD', 'GBP', 'NOK', 'SEK'];

// ── Core logic ───────────────────────────────────────────────────────────────

function slugify(name) {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function nextProductId(productsSource) {
  const matches = [...productsSource.matchAll(/id:\s*'(\d+)'/g)];
  if (matches.length === 0) return '01';
  const max = Math.max(...matches.map((m) => parseInt(m[1], 10)));
  return String(max + 1).padStart(2, '0');
}

function formatDimensions(d) {
  const parts = [`height: '${d.height}'`, `width: '${d.width}'`];
  if (d.depth) parts.push(`depth: '${d.depth}'`);
  parts.push(`unit: '${d.unit}'`);
  return `{ ${parts.join(', ')} }`;
}

function escapeBacktick(str) {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// images: array of { src, alt } — src may be pre-resolved (edit) or computed from slug+index+ext
function buildProductEntry(data, slug, id) {
  const images = data.images
    .map((img, i) => {
      const src = img.src || `/images/products/${slug}-${i + 1}${img.ext}`;
      return `      { src: '${src}', alt: '${img.alt.replace(/'/g, "\\'")}', priority: ${i === 0} }`;
    })
    .join(',\n');

  let tanneryField = '';
  if (data.tannery && data.tannery.length > 0) {
    const entries = data.tannery
      .map((t) => {
        const url = t.url ? `, url: '${t.url}'` : '';
        return `{ name: '${t.name.replace(/'/g, "\\'")}' ${url}}`;
      })
      .join(', ');
    tanneryField = `\n    tannery: [${entries}],`;
  }

  return `  {
    id: '${id}',
    slug: '${slug}',
    name: '${data.name.replace(/'/g, "\\'")}',
    category: '${data.category}',
    price: ${data.price},
    currency: '${data.currency}',
    description: \`${escapeBacktick(data.description)}\`,
    material: '${(data.material || 'Full-grain Italian leather').replace(/'/g, "\\'")}',
    construction: '${data.construction.replace(/'/g, "\\'")}',
    dimensions: ${formatDimensions(data.dimensions)},
    images: [
${images}
    ],${tanneryField}
  },`;
}

// ── Product parser (reads data/products.ts at runtime) ──────────────────────

function skipString(src, i) {
  const q = src[i]; i++;
  while (i < src.length) {
    if (src[i] === '\\') { i += 2; continue; }
    if (src[i] === q) return i + 1;
    i++;
  }
  return i;
}

function extractBlock(src, start) {
  let i = start + 1, depth = 1;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === '`' || ch === '"' || ch === "'") { i = skipString(src, i); continue; }
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    i++;
  }
  return src.slice(start, i);
}

function getStr(block, key) {
  const m = block.match(new RegExp(key + ":\\s*'((?:[^'\\\\]|\\\\.)*)'" ));
  return m ? m[1].replace(/\\'/g, "'") : null;
}

function parseProductBlock(block) {
  const name = getStr(block, 'name');
  if (!name) return null;
  const slug         = getStr(block, 'slug');
  const category     = getStr(block, 'category');
  const currency     = getStr(block, 'currency');
  const material     = getStr(block, 'material');
  const construction = getStr(block, 'construction');
  const idM          = block.match(/id:\s*'([^']+)'/);
  const id           = idM ? idM[1] : null;

  const priceM = block.match(/price:\s*(\d+(?:\.\d+)?)/);
  const price  = priceM ? parseFloat(priceM[1]) : null;

  const descM = block.match(/description:\s*`([\s\S]*?)`(?=\s*,)/);
  const description = descM ? descM[1].replace(/\\`/g, '`').replace(/\\\$/g, '$') : '';

  const dimM = block.match(/dimensions:\s*\{([^}]+)\}/);
  const dim  = dimM ? dimM[1] : '';
  const dimensions = {
    height: (dim.match(/height:\s*'([^']+)'/) || [])[1] || '',
    width:  (dim.match(/width:\s*'([^']+)'/)  || [])[1] || '',
    depth:  (dim.match(/depth:\s*'([^']+)'/)  || [])[1] || '',
    unit:   (dim.match(/unit:\s*'([^']+)'/)   || [])[1] || 'cm',
  };

  // Images: extract all { src: '...', alt: '...' } entries
  const imgRe = /\{\s*src:\s*'([^']+)',\s*alt:\s*'([^']+)'/g;
  const images = [...block.matchAll(imgRe)].map(m => ({ src: m[1], alt: m[2] }));

  const tanM    = block.match(/tannery:\s*\[[\s\S]*?name:\s*'([^']+)'/);
  const tannery = tanM ? tanM[1] : '__none__';

  return { id, name, slug, category, price, currency, description, material, construction, dimensions, images, tannery };
}

function parseProducts() {
  try {
    const src = fs.readFileSync(path.resolve(ROOT, 'data/products.ts'), 'utf-8');
    const arrayStart = src.indexOf('= [');
    if (arrayStart === -1) return [];
    const products = [];
    let i = arrayStart + 3;
    while (i < src.length) {
      if (src[i] === ' ' || src[i] === '\n' || src[i] === '\r') { i++; continue; }
      if (src[i] === '{') {
        const block = extractBlock(src, i);
        const p = parseProductBlock(block);
        if (p) products.push(p);
        i += block.length;
      } else if (src[i] === ']') {
        break;
      } else { i++; }
    }
    return products;
  } catch { return []; }
}

// ── Multipart parser ─────────────────────────────────────────────────────────

function parseMultipart(body, boundary) {
  const fields = {}, files = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  const parts = [];
  let start = 0;
  while (start < body.length) {
    const boundaryIdx = indexOf(body, boundaryBuf, start);
    if (boundaryIdx === -1) break;
    const after = boundaryIdx + boundaryBuf.length;
    if (body[after] === 45 && body[after + 1] === 45) break;
    const headerStart = body[after] === 13 ? after + 2 : after;
    const headerEnd = indexOf(body, Buffer.from('\r\n\r\n'), headerStart);
    if (headerEnd === -1) break;
    const headerStr = body.slice(headerStart, headerEnd).toString('utf-8');
    const contentStart = headerEnd + 4;
    const nextBoundary = indexOf(body, boundaryBuf, contentStart);
    const contentEnd = nextBoundary !== -1 ? nextBoundary - 2 : body.length;
    parts.push({ headers: headerStr, content: body.slice(contentStart, contentEnd) });
    start = nextBoundary !== -1 ? nextBoundary : body.length;
  }
  for (const part of parts) {
    const dispMatch = part.headers.match(/Content-Disposition:[^\r\n]*name="([^"]+)"/i);
    if (!dispMatch) continue;
    const name = dispMatch[1];
    const fileMatch = part.headers.match(/filename="([^"]*)"/i);
    if (fileMatch) {
      const typeMatch = part.headers.match(/Content-Type:\s*([^\r\n]+)/i);
      files.push({ fieldName: name, filename: fileMatch[1], mimeType: typeMatch ? typeMatch[1].trim() : 'application/octet-stream', data: part.content });
    } else {
      fields[name] = part.content.toString('utf-8');
    }
  }
  return { fields, files };
}

function indexOf(buf, search, start = 0) {
  for (let i = start; i <= buf.length - search.length; i++) {
    let found = true;
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) { found = false; break; }
    }
    if (found) return i;
  }
  return -1;
}

function extFromMime(mime) {
  if (mime.includes('jpeg') || mime.includes('jpg')) return '.jpg';
  if (mime.includes('png')) return '.png';
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('gif')) return '.gif';
  return '.jpg';
}

// ── Shared field extraction ──────────────────────────────────────────────────

function extractFields(fields) {
  const required = ['name', 'category', 'price', 'currency', 'description', 'construction', 'dim_height', 'dim_width', 'dim_unit'];
  for (const k of required) {
    if (!fields[k] || fields[k].trim() === '') throw new Error(`Missing required field: ${k}`);
  }
  const tannery = (fields.tannery && fields.tannery !== '__none__')
    ? [{ name: fields.tannery, url: TANNERY_URLS[fields.tannery] || undefined }]
    : null;
  return {
    name:         fields.name.trim(),
    category:     fields.category,
    price:        parseFloat(fields.price),
    currency:     fields.currency,
    description:  fields.description.trim(),
    material:     fields.material?.trim() || 'Full-grain Italian leather',
    construction: fields.construction.trim(),
    dimensions: {
      height: fields.dim_height.trim(),
      width:  fields.dim_width.trim(),
      depth:  fields.dim_depth?.trim() || undefined,
      unit:   fields.dim_unit,
    },
    tannery,
  };
}

// ── Add product ──────────────────────────────────────────────────────────────

function addProduct(fields, files) {
  const data = extractFields(fields);
  const slug = slugify(data.name);
  const productsFile = path.resolve(ROOT, 'data/products.ts');
  const productsSource = fs.readFileSync(productsFile, 'utf-8');

  if (productsSource.includes(`slug: '${slug}'`)) {
    throw new Error(`A product with slug "${slug}" already exists.`);
  }

  const imageFiles = files.filter(f => f.fieldName.startsWith('image_'));
  if (imageFiles.length === 0) throw new Error('At least one product image is required.');

  const destDir = path.resolve(ROOT, 'public/images/products');
  fs.mkdirSync(destDir, { recursive: true });

  data.images = imageFiles.map((f, i) => {
    const ext = extFromMime(f.mimeType) || path.extname(f.filename).toLowerCase() || '.jpg';
    fs.writeFileSync(path.join(destDir, `${slug}-${i + 1}${ext}`), f.data);
    return { ext, alt: fields[`image_alt_${i}`] || data.name };
  });

  const id    = nextProductId(productsSource);
  const entry = buildProductEntry(data, slug, id);
  const updated = productsSource.replace(/(\];\s*$)/, `${entry}\n$1`);
  if (updated === productsSource) throw new Error('Could not locate end of products array in data/products.ts');
  fs.writeFileSync(productsFile, updated, 'utf-8');

  return { slug, id, name: data.name, imageCount: data.images.length };
}

// ── Edit product ─────────────────────────────────────────────────────────────

function replaceProductInFile(slug, newEntry) {
  const productsFile = path.resolve(ROOT, 'data/products.ts');
  const src = fs.readFileSync(productsFile, 'utf-8');
  const slugIdx = src.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) throw new Error(`Product "${slug}" not found`);
  let blockStart = slugIdx;
  while (blockStart > 0 && src[blockStart] !== '{') blockStart--;
  const block   = extractBlock(src, blockStart);
  const updated = src.slice(0, blockStart) + newEntry + src.slice(blockStart + block.length);
  fs.writeFileSync(productsFile, updated, 'utf-8');
}

function updateProduct(slug, fields, files) {
  const data = extractFields(fields);

  // Parse the ordered image list sent by the client
  let imageOrder;
  try { imageOrder = JSON.parse(fields.image_order || '[]'); }
  catch { throw new Error('Invalid image_order data'); }
  if (imageOrder.length === 0) throw new Error('At least one product image is required.');

  const destDir = path.resolve(ROOT, 'public/images/products');
  fs.mkdirSync(destDir, { recursive: true });

  const ts = Date.now();
  let newFileIdx = 0;
  data.images = imageOrder.map((item) => {
    if (item.type === 'existing') {
      return { src: item.src, alt: item.alt };
    }
    const file = files.find(f => f.fieldName === 'new_image_' + item.newIdx);
    if (!file) throw new Error(`Missing uploaded file for new_image_${item.newIdx}`);
    const ext      = extFromMime(file.mimeType) || '.jpg';
    const filename = `${slug}-${ts}-${newFileIdx++}${ext}`;
    fs.writeFileSync(path.join(destDir, filename), file.data);
    return { src: `/images/products/${filename}`, alt: item.alt };
  });

  // Preserve the original id
  const products = parseProducts();
  const existing = products.find(p => p.slug === slug);
  const id = existing?.id || '00';

  const entry = buildProductEntry(data, slug, id);
  replaceProductInFile(slug, entry);

  return { slug, id, name: data.name, imageCount: data.images.length };
}

// ── HTML helpers ─────────────────────────────────────────────────────────────

function tanneryOptions() {
  return `<option value="__none__">— None —</option>\n` +
    TANNERIES.map(t => `<option value="${t}">${t}</option>`).join('\n');
}
function categoryOptions() {
  return CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('\n');
}
function currencyOptions() {
  return CURRENCIES.map(c => `<option value="${c}"${c === 'EUR' ? ' selected' : ''}>${c}</option>`).join('\n');
}

// ── HTML ─────────────────────────────────────────────────────────────────────

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fjordleather Admin</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #1a1a1a; color: #e8e0d8; min-height: 100vh; padding: 40px 20px; }
  .wrap { max-width: 820px; margin: 0 auto; }
  h1 { font-size: 28px; font-weight: 500; letter-spacing: 0.05em; color: #C4956A; margin-bottom: 8px; }
  .subtitle { font-size: 13px; color: #888; margin-bottom: 32px; }

  /* Tabs */
  .tabs { display: flex; gap: 0; margin-bottom: 40px; border-bottom: 1px solid #333; }
  .tab-btn { background: none; border: none; border-bottom: 2px solid transparent; color: #666; font-family: inherit; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 24px 10px 0; cursor: pointer; margin-bottom: -1px; transition: color 0.2s, border-color 0.2s; }
  .tab-btn.active { color: #C4956A; border-bottom-color: #C4956A; }
  .tab-btn:hover:not(.active) { color: #aaa; }

  .section { margin-bottom: 32px; }
  .section-title { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #888; margin-bottom: 16px; border-bottom: 1px solid #333; padding-bottom: 8px; }
  .row { display: flex; gap: 16px; margin-bottom: 16px; }
  .field { display: flex; flex-direction: column; gap: 6px; flex: 1; }
  label { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #aaa; }
  input[type="text"], input[type="number"], select, textarea {
    background: #2a2a2a; border: 1px solid #3a3a3a; color: #e8e0d8;
    padding: 10px 12px; font-size: 15px; font-family: inherit;
    border-radius: 0; outline: none; width: 100%; transition: border-color 0.2s;
  }
  input[type="text"]:focus, input[type="number"]:focus, select:focus, textarea:focus { border-color: #C4956A; }
  textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
  select option { background: #2a2a2a; }
  .hint { font-size: 11px; color: #666; }
  input[readonly] { opacity: 0.5; cursor: default; }

  /* Images */
  .image-drop-zone { border: 2px dashed #444; padding: 24px; text-align: center; cursor: pointer; transition: border-color 0.2s; margin-bottom: 16px; }
  .image-drop-zone:hover, .image-drop-zone.drag-over { border-color: #C4956A; }
  .image-drop-zone p { font-size: 13px; color: #888; margin-bottom: 8px; }
  .image-drop-zone span { font-size: 11px; color: #555; }
  #image-input { display: none; }
  .image-previews { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
  .image-preview { position: relative; background: #2a2a2a; border: 1px solid #3a3a3a; padding: 8px; width: 140px; cursor: grab; }
  .image-preview.existing { border-color: #4a6741; }
  .image-preview img { width: 100%; height: 100px; object-fit: contain; display: block; }
  .image-preview .alt-input { margin-top: 8px; width: 100%; background: #1a1a1a; border: 1px solid #3a3a3a; color: #e8e0d8; padding: 6px 8px; font-size: 12px; }
  .image-preview .remove-btn { position: absolute; top: 4px; right: 4px; background: #8B2020; color: #fff; border: none; cursor: pointer; width: 20px; height: 20px; font-size: 12px; line-height: 20px; text-align: center; }
  .image-preview .order-label { font-size: 10px; color: #666; text-align: center; margin-top: 4px; }
  .image-preview.existing .order-label { color: #4a6741; }

  /* Submit */
  .submit-btn { background: #8B5A2B; color: #fff; border: none; padding: 14px 40px; font-size: 14px; font-family: inherit; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; margin-top: 8px; }
  .submit-btn:hover { background: #A0692F; }
  .submit-btn:disabled { background: #555; cursor: not-allowed; }
  .reset-link { display: inline-block; margin-top: 12px; margin-left: 16px; font-size: 13px; color: #888; cursor: pointer; text-decoration: underline; }
  .reset-link:hover { color: #aaa; }

  /* Toast */
  #toast { position: fixed; bottom: 32px; right: 32px; padding: 16px 24px; font-size: 14px; border-radius: 0; display: none; z-index: 9999; max-width: 360px; line-height: 1.5; }
  #toast.success { background: #1e4a2e; color: #7ecb9a; border-left: 4px solid #4CAF50; }
  #toast.error   { background: #4a1e1e; color: #e07070; border-left: 4px solid #c0392b; }
  .product-link { display: block; margin-top: 6px; color: #C4956A; text-decoration: none; font-size: 13px; }
  .product-link:hover { text-decoration: underline; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Fjordleather Admin</h1>
  <p class="subtitle">Local tool — not for production.</p>

  <div class="tabs">
    <button class="tab-btn active" data-tab="add">Add Product</button>
    <button class="tab-btn" data-tab="edit">Edit Product</button>
  </div>

  <form id="product-form" enctype="multipart/form-data">

    <!-- ── Add mode: copy from ─────────────────────────────────────── -->
    <div class="section" id="section-copy-from">
      <div class="section-title">Copy from existing product</div>
      <div class="field">
        <label for="copy-from">Select a product to pre-fill all fields</label>
        <select id="copy-from">
          <option value="">— Select product —</option>
        </select>
        <span class="hint">Images are not copied. Name is cleared so the new product gets its own slug.</span>
      </div>
    </div>

    <!-- ── Edit mode: select product ──────────────────────────────── -->
    <div class="section" id="section-edit-select" style="display:none">
      <div class="section-title">Select product to edit</div>
      <div class="field">
        <label for="edit-select">Product</label>
        <select id="edit-select">
          <option value="">— Select product —</option>
        </select>
      </div>
    </div>

    <!-- ── Shared: slug (edit only, read-only) ──────────────────── -->
    <div class="section" id="section-slug" style="display:none">
      <div class="row">
        <div class="field">
          <label>Slug (fixed — changing name won't change the URL)</label>
          <input type="text" id="slug-display" readonly>
        </div>
      </div>
    </div>

    <!-- ── Identity ────────────────────────────────────────────────── -->
    <div class="section">
      <div class="section-title">Identity</div>
      <div class="row">
        <div class="field" style="flex:2">
          <label for="name">Product Name *</label>
          <input type="text" id="name" name="name" required placeholder="e.g. Fjell Bifold Wallet">
        </div>
        <div class="field">
          <label for="category">Category *</label>
          <select id="category" name="category" required>${categoryOptions()}</select>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label for="price">Price *</label>
          <input type="number" id="price" name="price" required min="0" step="0.01" placeholder="250">
        </div>
        <div class="field">
          <label for="currency">Currency</label>
          <select id="currency" name="currency">${currencyOptions()}</select>
        </div>
        <div class="field">
          <label for="tannery">Tannery</label>
          <select id="tannery" name="tannery">${tanneryOptions()}</select>
        </div>
      </div>
    </div>

    <!-- ── Copy ────────────────────────────────────────────────────── -->
    <div class="section">
      <div class="section-title">Copy</div>
      <div class="field" style="margin-bottom:16px">
        <label for="description">Description *</label>
        <textarea id="description" name="description" required placeholder="A long-form product description. No HTML."></textarea>
      </div>
      <div class="row">
        <div class="field">
          <label for="material">Material</label>
          <input type="text" id="material" name="material" placeholder="Full-grain Italian leather">
          <span class="hint">Leave blank to use default</span>
        </div>
        <div class="field">
          <label for="construction">Construction *</label>
          <input type="text" id="construction" name="construction" required placeholder="e.g. Saddle-stitched by hand with linen thread">
        </div>
      </div>
    </div>

    <!-- ── Dimensions ──────────────────────────────────────────────── -->
    <div class="section">
      <div class="section-title">Dimensions</div>
      <div class="row">
        <div class="field">
          <label for="dim_height">Height *</label>
          <input type="text" id="dim_height" name="dim_height" required placeholder="10">
        </div>
        <div class="field">
          <label for="dim_width">Width *</label>
          <input type="text" id="dim_width" name="dim_width" required placeholder="12">
        </div>
        <div class="field">
          <label for="dim_depth">Depth</label>
          <input type="text" id="dim_depth" name="dim_depth" placeholder="3">
        </div>
        <div class="field">
          <label for="dim_unit">Unit</label>
          <select id="dim_unit" name="dim_unit">
            <option value="cm" selected>cm</option>
            <option value="in">in</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ── Images ──────────────────────────────────────────────────── -->
    <div class="section">
      <div class="section-title">Images</div>
      <div class="image-drop-zone" id="drop-zone">
        <p>Drop images here or click to browse</p>
        <span>PNG, JPG, WEBP — first image is primary. Drag to reorder.</span>
        <input type="file" id="image-input" accept="image/*" multiple>
      </div>
      <div class="image-previews" id="image-previews"></div>
    </div>

    <!-- ── Actions ─────────────────────────────────────────────────── -->
    <div class="section">
      <button type="submit" class="submit-btn" id="submit-btn">Add Product</button>
      <a class="reset-link" id="reset-link">Reset form</a>
    </div>

  </form>
</div>

<div id="toast"></div>

<script>
// ── State ───────────────────────────────────────────────────────────────
// Each entry: { type: 'new'|'existing', file?, objectUrl, src?, alt }
const images = [];
let mode = 'add';            // 'add' | 'edit'
let editSlug = null;         // slug of product being edited
let existingProducts = [];   // loaded from /api/products

// ── Tabs ────────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    mode = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('section-copy-from').style.display  = mode === 'add'  ? '' : 'none';
    document.getElementById('section-edit-select').style.display = mode === 'edit' ? '' : 'none';
    document.getElementById('section-slug').style.display        = 'none';
    document.getElementById('submit-btn').textContent = mode === 'add' ? 'Add Product' : 'Save Changes';
    resetForm();
  });
});

// ── Load product list ────────────────────────────────────────────────────
fetch('/api/products')
  .then(r => r.json())
  .then(products => {
    existingProducts = products;
    const addOpts  = document.getElementById('copy-from');
    const editOpts = document.getElementById('edit-select');
    products.forEach(p => {
      const label = p.name + ' (' + p.category + ')';
      addOpts.insertAdjacentHTML('beforeend', \`<option value="\${p.slug}">\${label}</option>\`);
      editOpts.insertAdjacentHTML('beforeend', \`<option value="\${p.slug}">\${label}</option>\`);
    });
  })
  .catch(() => {});

// ── Copy-from (Add mode) ─────────────────────────────────────────────────
document.getElementById('copy-from').addEventListener('change', function () {
  const p = existingProducts.find(x => x.slug === this.value);
  if (!p) return;
  fillFields(p, false);
  this.value = '';
  document.getElementById('name').value = '';
  document.getElementById('name').focus();
});

// ── Edit select ──────────────────────────────────────────────────────────
document.getElementById('edit-select').addEventListener('change', function () {
  const p = existingProducts.find(x => x.slug === this.value);
  if (!p) { editSlug = null; return; }
  editSlug = p.slug;
  document.getElementById('slug-display').value = p.slug;
  document.getElementById('section-slug').style.display = '';
  fillFields(p, true);
});

// ── Fill shared fields ───────────────────────────────────────────────────
function fillFields(p, includeImages) {
  document.getElementById('name').value         = p.name         || '';
  document.getElementById('category').value     = p.category     || 'bags';
  document.getElementById('price').value        = p.price        ?? '';
  document.getElementById('currency').value     = p.currency     || 'EUR';
  document.getElementById('tannery').value      = p.tannery      || '__none__';
  document.getElementById('description').value  = p.description  || '';
  document.getElementById('material').value     = p.material     || '';
  document.getElementById('construction').value = p.construction || '';
  document.getElementById('dim_height').value   = p.dimensions?.height || '';
  document.getElementById('dim_width').value    = p.dimensions?.width  || '';
  document.getElementById('dim_depth').value    = p.dimensions?.depth  || '';
  document.getElementById('dim_unit').value     = p.dimensions?.unit   || 'cm';

  images.forEach(img => { if (img.objectUrl && img.type === 'new') URL.revokeObjectURL(img.objectUrl); });
  images.length = 0;

  if (includeImages && p.images && p.images.length > 0) {
    p.images.forEach(img => {
      images.push({ type: 'existing', src: img.src, objectUrl: 'http://localhost:3000' + img.src, alt: img.alt });
    });
  }
  renderPreviews();
}

// ── Image management ─────────────────────────────────────────────────────
const dropZone   = document.getElementById('drop-zone');
const imageInput = document.getElementById('image-input');
const previewsEl = document.getElementById('image-previews');

dropZone.addEventListener('click', () => imageInput.click());
dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault(); dropZone.classList.remove('drag-over');
  addFiles(Array.from(e.dataTransfer.files));
});
imageInput.addEventListener('change', () => { addFiles(Array.from(imageInput.files)); imageInput.value = ''; });

function addFiles(files) {
  files.filter(f => f.type.startsWith('image/')).forEach(f => {
    images.push({ type: 'new', file: f, objectUrl: URL.createObjectURL(f), alt: f.name.replace(/\\.[^.]+$/, '') });
  });
  renderPreviews();
}

function removeImage(idx) {
  if (images[idx].type === 'new') URL.revokeObjectURL(images[idx].objectUrl);
  images.splice(idx, 1);
  renderPreviews();
}

function renderPreviews() {
  previewsEl.innerHTML = '';
  images.forEach((img, i) => {
    const isExisting = img.type === 'existing';
    const div = document.createElement('div');
    div.className = 'image-preview' + (isExisting ? ' existing' : '');
    div.draggable = true;
    div.dataset.idx = i;
    const badge = isExisting ? '<span style="position:absolute;top:4px;left:4px;font-size:9px;background:#4a6741;color:#c8e6c0;padding:1px 4px">ON DISK</span>' : '';
    div.innerHTML = \`
      \${badge}
      <button type="button" class="remove-btn" data-idx="\${i}">✕</button>
      <img src="\${img.objectUrl}" alt="" onerror="this.style.opacity='0.3'">
      <input class="alt-input" type="text" placeholder="Alt text" value="\${img.alt}" data-idx="\${i}">
      <div class="order-label">\${i === 0 ? '★ Primary' : 'Image ' + (i + 1)}</div>
    \`;
    previewsEl.appendChild(div);
  });

  let dragSrcIdx = null;
  previewsEl.querySelectorAll('.image-preview').forEach(el => {
    el.addEventListener('dragstart', e => { dragSrcIdx = +el.dataset.idx; el.style.opacity = '0.4'; });
    el.addEventListener('dragend',   () => { previewsEl.querySelectorAll('.image-preview').forEach(e => e.style.opacity = '1'); });
    el.addEventListener('dragover',  e => { e.preventDefault(); el.style.borderColor = '#C4956A'; });
    el.addEventListener('dragleave', () => { el.style.borderColor = el.classList.contains('existing') ? '#4a6741' : '#3a3a3a'; });
    el.addEventListener('drop', e => {
      e.preventDefault(); el.style.borderColor = el.classList.contains('existing') ? '#4a6741' : '#3a3a3a';
      const targetIdx = +el.dataset.idx;
      if (dragSrcIdx !== null && dragSrcIdx !== targetIdx) {
        const [moved] = images.splice(dragSrcIdx, 1);
        images.splice(targetIdx, 0, moved);
        renderPreviews();
      }
    });
  });

  previewsEl.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeImage(+btn.dataset.idx));
  });
  previewsEl.querySelectorAll('.alt-input').forEach(input => {
    input.addEventListener('input', () => { images[+input.dataset.idx].alt = input.value; });
  });
}

// ── Form submission ──────────────────────────────────────────────────────
document.getElementById('product-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Saving…';

  if (images.length === 0) {
    showToast('error', 'Add at least one product image.');
    btn.disabled = false; btn.textContent = mode === 'add' ? 'Add Product' : 'Save Changes';
    return;
  }
  if (mode === 'edit' && !editSlug) {
    showToast('error', 'Select a product to edit first.');
    btn.disabled = false; btn.textContent = 'Save Changes';
    return;
  }

  const form = e.target;
  const fd   = new FormData(form);

  if (mode === 'add') {
    // Attach new images in order
    images.forEach((img, i) => {
      fd.set('image_' + i, img.file, img.file.name);
      fd.set('image_alt_' + i, img.alt || img.file.name);
    });
    try {
      const res  = await fetch('/add-product', { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok) {
        showToast('success',
          \`✓ Added: "\${json.name}" (\${json.imageCount} image\${json.imageCount !== 1 ? 's' : ''})\`,
          'http://localhost:3000/products/' + json.slug);
        resetForm();
      } else { showToast('error', json.error || 'Unknown error'); }
    } catch (err) { showToast('error', 'Server error: ' + err.message); }

  } else {
    // Edit mode — build image_order + attach new files
    let newIdx = 0;
    const imageOrder = images.map(img => {
      if (img.type === 'existing') return { type: 'existing', src: img.src, alt: img.alt };
      const idx = newIdx++;
      fd.set('new_image_' + idx, img.file, img.file.name);
      return { type: 'new', newIdx: idx, alt: img.alt };
    });
    fd.set('image_order', JSON.stringify(imageOrder));

    try {
      const res  = await fetch('/edit-product?slug=' + encodeURIComponent(editSlug), { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok) {
        showToast('success',
          \`✓ Updated: "\${json.name}" (\${json.imageCount} image\${json.imageCount !== 1 ? 's' : ''})\`,
          'http://localhost:3000/products/' + json.slug);
        // Reload product list so copy-from stays current
        existingProducts = existingProducts.map(p => p.slug === json.slug ? { ...p, ...json } : p);
      } else { showToast('error', json.error || 'Unknown error'); }
    } catch (err) { showToast('error', 'Server error: ' + err.message); }
  }

  btn.disabled = false;
  btn.textContent = mode === 'add' ? 'Add Product' : 'Save Changes';
});

// ── Reset ────────────────────────────────────────────────────────────────
document.getElementById('reset-link').addEventListener('click', resetForm);

function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('section-slug').style.display = 'none';
  editSlug = null;
  images.forEach(img => { if (img.type === 'new') URL.revokeObjectURL(img.objectUrl); });
  images.length = 0;
  renderPreviews();
}

// ── Toast ────────────────────────────────────────────────────────────────
function showToast(type, message, link) {
  const t = document.getElementById('toast');
  t.className = type;
  t.innerHTML = message + (link ? \`<a class="product-link" href="\${link}" target="_blank">→ Open product page</a>\` : '');
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 7000);
}
</script>
</body>
</html>`;

// ── HTTP server ───────────────────────────────────────────────────────────────

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handleMultipart(req, res, handler) {
  try {
    const contentType  = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Expected multipart/form-data' })); return;
    }
    const body = await readBody(req);
    const { fields, files } = parseMultipart(body, boundaryMatch[1]);
    const result = handler(fields, files);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (err) {
    console.error('  ✗', err.message);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML); return;
  }

  if (req.method === 'GET' && url.pathname === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(parseProducts())); return;
  }

  if (req.method === 'POST' && url.pathname === '/add-product') {
    await handleMultipart(req, res, (fields, files) => addProduct(fields, files));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/edit-product') {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing slug query parameter' })); return;
    }
    await handleMultipart(req, res, (fields, files) => updateProduct(slug, fields, files));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n🛠  Fjordleather Admin\n');
  console.log(`   http://localhost:${PORT}\n`);
  console.log('   Ctrl+C to stop\n');
});
