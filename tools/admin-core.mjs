/**
 * Fjordleather Admin — Core Logic
 * Pure functions, fully exported for testing.
 * No HTTP server here — see admin-server.mjs.
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');

// ── Logger ────────────────────────────────────────────────────────────────────

const LEVEL_COLOR = { DEBUG: '\x1b[90m', INFO: '\x1b[36m', WARN: '\x1b[33m', ERROR: '\x1b[31m' };
const RESET = '\x1b[0m';

export function log(level, message, data) {
  const time  = new Date().toTimeString().slice(0, 12); // HH:MM:SS.mmm
  const color = LEVEL_COLOR[level] || '';
  const lvl   = level.padEnd(5);
  const extra = data ? '  ' + JSON.stringify(data) : '';
  console.log(`${color}${time}  ${lvl}${RESET}  ${message}${extra}`);
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const TANNERIES = [
  'Artigiano Del Cuoio', 'Badalassi Carlo', 'Conceria La Bretagna',
  'Curtiba Ind. Conciaria', 'Il Gabbiano', 'Il Ponte',
  'Italpel', 'La Perla Azzurra', 'Lo Stivale', 'M.P.G. Industria Conciaria',
  'Monteverdi', 'Nuova Albora', 'Orice', 'Puccini Attilio', 'Tempesti',
  'Volpi Concerie', 'WALPIER',
];

export const TANNERY_URLS = {
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

export const CATEGORIES = ['bags', 'wallets'];
export const CURRENCIES  = ['EUR', 'DKK', 'USD', 'GBP', 'NOK', 'SEK'];

// ── Product entry helpers ─────────────────────────────────────────────────────

export function slugify(name) {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export function nextProductId(productsSource) {
  const matches = [...productsSource.matchAll(/id:\s*'(\d+)'/g)];
  if (matches.length === 0) return '01';
  const max = Math.max(...matches.map(m => parseInt(m[1], 10)));
  return String(max + 1).padStart(2, '0');
}

export function formatDimensions(d) {
  const parts = [`height: '${d.height}'`, `width: '${d.width}'`];
  if (d.depth) parts.push(`depth: '${d.depth}'`);
  parts.push(`unit: '${d.unit}'`);
  return `{ ${parts.join(', ')} }`;
}

export function escapeBacktick(str) {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// images: array of { src, alt } (edit) or { ext, alt } (add)
export function buildProductEntry(data, slug, id) {
  const images = data.images
    .map((img, i) => {
      const src = img.src || `/images/products/${slug}-${i + 1}${img.ext}`;
      return `      { src: '${src}', alt: '${img.alt.replace(/'/g, "\\'")}', priority: ${i === 0} }`;
    })
    .join(',\n');

  let tanneryField = '';
  if (data.tannery && data.tannery.length > 0) {
    const entries = data.tannery
      .map(t => `{ name: '${t.name.replace(/'/g, "\\'")}' ${t.url ? `, url: '${t.url}'` : ''}}`)
      .join(', ');
    tanneryField = `\n    tannery: [${entries}],`;
  }

  const soldField = data.sold ? '\n    sold: true,' : '';

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
    ],${tanneryField}${soldField}
  },`;
}

// ── Product parser ────────────────────────────────────────────────────────────

export function skipString(src, i) {
  const q = src[i]; i++;
  while (i < src.length) {
    if (src[i] === '\\') { i += 2; continue; }
    if (src[i] === q) return i + 1;
    i++;
  }
  return i;
}

export function extractBlock(src, start) {
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

export function getStr(block, key) {
  const m = block.match(new RegExp(key + ":\\s*'((?:[^'\\\\]|\\\\.)*)'"));
  return m ? m[1].replace(/\\'/g, "'") : null;
}

export function parseProductBlock(block) {
  const name = getStr(block, 'name');
  if (!name) return null;

  const slug         = getStr(block, 'slug');
  const category     = getStr(block, 'category');
  const currency     = getStr(block, 'currency');
  const material     = getStr(block, 'material');
  const construction = getStr(block, 'construction');
  const idM          = block.match(/id:\s*'([^']+)'/);
  const id           = idM ? idM[1] : null;
  const priceM       = block.match(/price:\s*(\d+(?:\.\d+)?)/);
  const price        = priceM ? parseFloat(priceM[1]) : null;

  const descM       = block.match(/description:\s*`([\s\S]*?)`(?=\s*,)/);
  const description = descM ? descM[1].replace(/\\`/g, '`').replace(/\\\$/g, '$') : '';

  const dimM = block.match(/dimensions:\s*\{([^}]+)\}/);
  const dim  = dimM ? dimM[1] : '';
  const dimensions = {
    height: (dim.match(/height:\s*'([^']+)'/) || [])[1] || '',
    width:  (dim.match(/width:\s*'([^']+)'/)  || [])[1] || '',
    depth:  (dim.match(/depth:\s*'([^']+)'/)  || [])[1] || '',
    unit:   (dim.match(/unit:\s*'([^']+)'/)   || [])[1] || 'cm',
  };

  const imgRe = /\{\s*src:\s*'([^']+)',\s*alt:\s*'([^']+)'/g;
  const images = [...block.matchAll(imgRe)].map(m => ({ src: m[1], alt: m[2] }));

  const tanM    = block.match(/tannery:\s*\[[\s\S]*?name:\s*'([^']+)'/);
  const tannery = tanM ? tanM[1] : '__none__';

  const sold = /sold:\s*true/.test(block);

  return { id, name, slug, category, price, currency, description, material, construction, dimensions, images, tannery, sold };
}

export function parseProducts() {
  try {
    const src = fs.readFileSync(path.resolve(ROOT, 'data/products.ts'), 'utf-8');
    const arrayStart = src.indexOf('= [');
    if (arrayStart === -1) return [];
    const products = [];
    let i = arrayStart + 3;
    while (i < src.length) {
      if (' \n\r'.includes(src[i])) { i++; continue; }
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
  } catch (err) {
    log('ERROR', 'parseProducts failed', { error: err.message });
    return [];
  }
}

// ── Multipart parser ──────────────────────────────────────────────────────────

export function indexOfBuf(buf, search, start = 0) {
  outer: for (let i = start; i <= buf.length - search.length; i++) {
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) continue outer;
    }
    return i;
  }
  return -1;
}

export function extFromMime(mime) {
  if (mime.includes('jpeg') || mime.includes('jpg')) return '.jpg';
  if (mime.includes('png'))  return '.png';
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('gif'))  return '.gif';
  return '.jpg';
}

export function parseMultipart(body, boundary) {
  const fields = {}, files = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  const crlfcrlfBuf = Buffer.from('\r\n\r\n');
  let start = 0;

  while (start < body.length) {
    const boundaryIdx = indexOfBuf(body, boundaryBuf, start);
    if (boundaryIdx === -1) break;

    const afterBoundary = boundaryIdx + boundaryBuf.length;

    // Final boundary: --boundary--
    if (body[afterBoundary] === 0x2D && body[afterBoundary + 1] === 0x2D) break;

    // Skip CRLF (or just LF) after boundary line
    let headerStart = afterBoundary;
    if (body[headerStart] === 0x0D && body[headerStart + 1] === 0x0A) headerStart += 2;
    else if (body[headerStart] === 0x0A) headerStart += 1;

    // Find end of part headers (blank line = \r\n\r\n)
    const headerEnd = indexOfBuf(body, crlfcrlfBuf, headerStart);
    if (headerEnd === -1) {
      log('WARN', 'Multipart: could not find end of headers, skipping part');
      break;
    }

    const headerStr   = body.slice(headerStart, headerEnd).toString('utf-8');
    const contentStart = headerEnd + 4;

    // Content ends just before the next boundary (minus \r\n)
    const nextBoundary = indexOfBuf(body, boundaryBuf, contentStart);
    const contentEnd   = nextBoundary !== -1 ? nextBoundary - 2 : body.length;
    const content      = body.slice(contentStart, contentEnd);

    // Parse Content-Disposition.
    // Use ;\s*name= (not just name=) so the greedy [^\r\n]* doesn't overshoot to
    // the `name=` buried inside `filename="photo.jpg"`, which would return the
    // filename as the field name — the root cause of the image-upload bug.
    const dispMatch = headerStr.match(/Content-Disposition:[^\r\n]*?;\s*name="([^"]+)"/i);
    if (dispMatch) {
      const fieldName = dispMatch[1];
      const fileMatch = headerStr.match(/filename="([^"]*)"/i);
      if (fileMatch) {
        const typeMatch = headerStr.match(/Content-Type:\s*([^\r\n]+)/i);
        const mimeType  = typeMatch ? typeMatch[1].trim() : 'application/octet-stream';
        files.push({ fieldName, filename: fileMatch[1], mimeType, data: content });
      } else {
        fields[fieldName] = content.toString('utf-8');
      }
    }

    start = nextBoundary !== -1 ? nextBoundary : body.length;
  }

  return { fields, files };
}

// ── Field extraction + validation ─────────────────────────────────────────────

export function extractFields(fields) {
  const required = ['name', 'category', 'price', 'currency', 'description',
    'construction', 'dim_height', 'dim_width', 'dim_unit'];
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
    sold: fields.sold === 'on' || fields.sold === 'true',
  };
}

// ── Replace product in source string (pure — testable without fs) ─────────────

export function replaceInSource(slug, newEntry, src) {
  const slugIdx = src.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) throw new Error(`Product "${slug}" not found`);
  let blockStart = slugIdx;
  while (blockStart > 0 && src[blockStart] !== '{') blockStart--;
  const block      = extractBlock(src, blockStart);
  let   afterBlock = blockStart + block.length;
  if (src[afterBlock] === ',') afterBlock++; // skip trailing comma — prevents ,,
  return src.slice(0, blockStart) + newEntry + src.slice(afterBlock);
}

export function deleteProduct(slug) {
  const productsFile = path.resolve(ROOT, 'data/products.ts');
  const src      = fs.readFileSync(productsFile, 'utf-8');
  const slugIdx  = src.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) throw new Error(`Product "${slug}" not found`);
  let blockStart = slugIdx;
  while (blockStart > 0 && src[blockStart] !== '{') blockStart--;
  const block    = extractBlock(src, blockStart);
  let afterBlock = blockStart + block.length;
  if (src[afterBlock] === ',') afterBlock++;
  if (src[afterBlock] === '\n') afterBlock++;
  const updated  = src.slice(0, blockStart) + src.slice(afterBlock);
  fs.writeFileSync(productsFile, updated, 'utf-8');
  log('INFO', 'Deleted product', { slug });
  return { slug };
}

function replaceProductInFile(slug, newEntry) {
  const productsFile = path.resolve(ROOT, 'data/products.ts');
  const src     = fs.readFileSync(productsFile, 'utf-8');
  const updated = replaceInSource(slug, newEntry, src);
  fs.writeFileSync(productsFile, updated, 'utf-8');
  log('INFO', `Replaced product in products.ts`, { slug });
}

// ── Add product ───────────────────────────────────────────────────────────────

export function addProduct(fields, files) {
  log('INFO', 'addProduct start', { name: fields.name });

  const data = extractFields(fields);
  const slug = slugify(data.name);
  const productsFile   = path.resolve(ROOT, 'data/products.ts');
  const productsSource = fs.readFileSync(productsFile, 'utf-8');

  if (productsSource.includes(`slug: '${slug}'`)) {
    throw new Error(`A product with slug "${slug}" already exists.`);
  }

  const imageFiles = files.filter(f =>
    f.fieldName.startsWith('image_') && !f.fieldName.startsWith('image_alt')
  );
  log('DEBUG', 'Files received', {
    total: files.length,
    imageFiles: imageFiles.length,
    names: files.map(f => `${f.fieldName}(${f.data.length}b)`),
  });

  if (imageFiles.length === 0) {
    throw new Error(
      `At least one product image is required. ` +
      `[files_received=${files.length}, fields=${Object.keys(fields).join(',')}]`
    );
  }

  const destDir = path.resolve(ROOT, 'public/images/products');
  fs.mkdirSync(destDir, { recursive: true });

  data.images = imageFiles.map((f, i) => {
    const ext  = extFromMime(f.mimeType) || path.extname(f.filename).toLowerCase() || '.jpg';
    const dest = path.join(destDir, `${slug}-${i + 1}${ext}`);
    fs.writeFileSync(dest, f.data);
    log('DEBUG', `Saved image`, { file: `${slug}-${i + 1}${ext}`, size: f.data.length });
    return { ext, alt: fields[`image_alt_${i}`] || data.name };
  });

  const id    = nextProductId(productsSource);
  const entry = buildProductEntry(data, slug, id);
  const updated = productsSource.replace(/(\];\s*$)/, `${entry}\n$1`);
  if (updated === productsSource) throw new Error('Could not locate end of products array in data/products.ts');
  fs.writeFileSync(productsFile, updated, 'utf-8');

  log('INFO', `Added product`, { name: data.name, slug, id, images: data.images.length });
  return { slug, id, name: data.name, imageCount: data.images.length };
}

// ── Edit product ──────────────────────────────────────────────────────────────

export function updateProduct(slug, fields, files) {
  log('INFO', 'updateProduct start', { slug });

  const data = extractFields(fields);

  let imageOrder;
  try { imageOrder = JSON.parse(fields.image_order || '[]'); }
  catch { throw new Error('Invalid image_order data'); }
  if (imageOrder.length === 0) throw new Error('At least one product image is required.');

  log('DEBUG', 'Image order', { count: imageOrder.length, newFiles: files.length });

  const destDir = path.resolve(ROOT, 'public/images/products');
  fs.mkdirSync(destDir, { recursive: true });

  const ts = Date.now();
  let newFileIdx = 0;
  data.images = imageOrder.map(item => {
    if (item.type === 'existing') {
      return { src: item.src, alt: item.alt };
    }
    const file = files.find(f => f.fieldName === 'new_image_' + item.newIdx);
    if (!file) throw new Error(`Missing uploaded file for new_image_${item.newIdx}`);
    const ext      = extFromMime(file.mimeType) || '.jpg';
    const filename = `${slug}-${ts}-${newFileIdx++}${ext}`;
    fs.writeFileSync(path.join(destDir, filename), file.data);
    log('DEBUG', `Saved new image`, { file: filename, size: file.data.length });
    return { src: `/images/products/${filename}`, alt: item.alt };
  });

  const products = parseProducts();
  const existing = products.find(p => p.slug === slug);
  const id = existing?.id || '00';

  const entry = buildProductEntry(data, slug, id);
  replaceProductInFile(slug, entry);

  log('INFO', `Updated product`, { slug, id, images: data.images.length });
  return { slug, id, name: data.name, imageCount: data.images.length };
}
