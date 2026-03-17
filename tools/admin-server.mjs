#!/usr/bin/env node
/**
 * Fjordleather — Local Admin Server
 * Usage: npm run admin
 *
 * Thin HTTP layer — all business logic lives in admin-core.mjs.
 * Serves Add Product + Edit Product at http://localhost:3001
 * NOT for production — local use only.
 */

import http from 'http';
import {
  log,
  TANNERIES, TANNERY_URLS, CATEGORIES, CURRENCIES,
  parseProducts, parseMultipart, addProduct, updateProduct, deleteProduct,
} from './admin-core.mjs';

const PORT = 3001;

// ── HTML option helpers ───────────────────────────────────────────────────────

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
  textarea { resize: vertical; min-height: 160px; line-height: 1.6; }
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
  .delete-btn { background: none; color: #c0392b; border: 1px solid #c0392b; padding: 14px 28px; font-size: 14px; font-family: inherit; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, color 0.2s; margin-top: 8px; margin-left: 16px; }
  .delete-btn:hover { background: #c0392b; color: #fff; }

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
      <div class="row">
        <div class="field">
          <label for="add-category-filter">Category</label>
          <select id="add-category-filter">
            <option value="">— All categories —</option>
            ${categoryOptions()}
          </select>
        </div>
        <div class="field" style="flex:2">
          <label for="copy-from">Product</label>
          <select id="copy-from">
            <option value="">— Select product —</option>
          </select>
          <span class="hint">Images are not copied. Name is cleared so the new product gets its own slug.</span>
        </div>
      </div>
    </div>

    <!-- ── Edit mode: select product ──────────────────────────────── -->
    <div class="section" id="section-edit-select" style="display:none">
      <div class="section-title">Select product to edit</div>
      <div class="row">
        <div class="field">
          <label for="edit-category-filter">Category</label>
          <select id="edit-category-filter">
            <option value="">— All categories —</option>
            ${categoryOptions()}
          </select>
        </div>
        <div class="field" style="flex:2">
          <label for="edit-select">Product</label>
          <select id="edit-select">
            <option value="">— Select product —</option>
          </select>
        </div>
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
        <textarea id="description" name="description" required placeholder="A long-form product description. Press Enter twice for a new paragraph, once for a line break."></textarea>
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

    <!-- ── Status (edit mode only) ─────────────────────────────────── -->
    <div class="section" id="section-status" style="display:none">
      <div class="section-title">Status</div>
      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px;color:#e8e0d8;letter-spacing:normal;text-transform:none">
        <input type="checkbox" id="sold" name="sold" style="width:16px;height:16px;accent-color:#8B5A2B;flex-shrink:0">
        Mark as Sold — displays a watermark on product images
      </label>
    </div>

    <!-- ── Actions ─────────────────────────────────────────────────── -->
    <div class="section">
      <button type="submit" class="submit-btn" id="submit-btn">Add Product</button>
      <button type="button" class="delete-btn" id="delete-btn" style="display:none">Delete Product</button>
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
    document.getElementById('section-status').style.display      = 'none';
    document.getElementById('delete-btn').style.display          = 'none';
    document.getElementById('submit-btn').textContent = mode === 'add' ? 'Add Product' : 'Save Changes';
    resetForm();
  });
});

// ── Load product list ────────────────────────────────────────────────────
function populateProductLists() {
  populateCopyFrom();
  populateEditSelect();
}

function populateCopyFrom() {
  const filterCat = document.getElementById('add-category-filter').value;
  const addOpts   = document.getElementById('copy-from');
  addOpts.innerHTML = '<option value="">— Select product —</option>';
  existingProducts
    .filter(p => !filterCat || p.category === filterCat)
    .forEach(p => {
      addOpts.insertAdjacentHTML('beforeend', \`<option value="\${p.slug}">\${p.name}</option>\`);
    });
}

function populateEditSelect() {
  const filterCat = document.getElementById('edit-category-filter').value;
  const editOpts  = document.getElementById('edit-select');
  const prevSlug  = editOpts.value;
  editOpts.innerHTML = '<option value="">— Select product —</option>';
  existingProducts
    .filter(p => !filterCat || p.category === filterCat)
    .forEach(p => {
      editOpts.insertAdjacentHTML('beforeend', \`<option value="\${p.slug}">\${p.name}</option>\`);
    });
  // Restore selection if still available
  if (prevSlug && [...editOpts.options].some(o => o.value === prevSlug)) {
    editOpts.value = prevSlug;
  }
}

fetch('/api/products')
  .then(r => r.json())
  .then(products => { existingProducts = products; populateProductLists(); })
  .catch(() => {});

document.getElementById('add-category-filter').addEventListener('change', () => {
  populateCopyFrom();
  document.getElementById('copy-from').value = '';
});

document.getElementById('edit-category-filter').addEventListener('change', () => {
  populateEditSelect();
  // Clear product selection when category changes
  document.getElementById('edit-select').value = '';
  editSlug = null;
  document.getElementById('section-slug').style.display   = 'none';
  document.getElementById('section-status').style.display = 'none';
  document.getElementById('delete-btn').style.display     = 'none';
  resetForm();
});

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
  document.getElementById('section-slug').style.display   = '';
  document.getElementById('section-status').style.display = '';
  document.getElementById('delete-btn').style.display     = '';
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
  document.getElementById('sold').checked       = !!p.sold;

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
        fetch('/api/products').then(r => r.json()).then(p => { existingProducts = p; populateProductLists(); }).catch(() => {});
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
        // Re-fetch full product list so copy-from and edit dropdowns reflect latest data
        fetch('/api/products').then(r => r.json()).then(p => { existingProducts = p; populateProductLists(); }).catch(() => {});
      } else { showToast('error', json.error || 'Unknown error'); }
    } catch (err) { showToast('error', 'Server error: ' + err.message); }
  }

  btn.disabled = false;
  btn.textContent = mode === 'add' ? 'Add Product' : 'Save Changes';
});

// ── Delete ───────────────────────────────────────────────────────────────
document.getElementById('delete-btn').addEventListener('click', async () => {
  if (!editSlug) return;
  if (!confirm(\`Delete "\${document.getElementById('name').value}"? This cannot be undone.\`)) return;
  const btn = document.getElementById('delete-btn');
  btn.disabled = true;
  try {
    const res  = await fetch('/delete-product?slug=' + encodeURIComponent(editSlug), { method: 'DELETE' });
    const json = await res.json();
    if (res.ok) {
      showToast('success', \`✓ Deleted: "\${json.slug}"\`);
      fetch('/api/products').then(r => r.json()).then(p => { existingProducts = p; populateProductLists(); }).catch(() => {});
      resetForm();
      document.getElementById('edit-category-filter').value = '';
      populateEditSelect();
    } else { showToast('error', json.error || 'Unknown error'); }
  } catch (err) { showToast('error', 'Server error: ' + err.message); }
  btn.disabled = false;
});

// ── Reset ────────────────────────────────────────────────────────────────
document.getElementById('reset-link').addEventListener('click', resetForm);

function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('section-slug').style.display   = 'none';
  document.getElementById('section-status').style.display = 'none';
  document.getElementById('delete-btn').style.display     = 'none';
  document.getElementById('add-category-filter').value    = '';
  populateCopyFrom();
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
    const contentType   = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^\s;]+))/);
    if (!boundaryMatch) {
      log('WARN', 'Missing multipart boundary', { contentType });
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Expected multipart/form-data' })); return;
    }
    const boundary = boundaryMatch[1] || boundaryMatch[2];
    log('DEBUG', 'Parsing multipart', { boundary, bodyBytes: req.headers['content-length'] });

    const body              = await readBody(req);
    const { fields, files } = parseMultipart(body, boundary);
    log('DEBUG', 'Multipart parsed', {
      fields: Object.keys(fields),
      files: files.map(f => `${f.fieldName}(${f.data.length}b)`),
    });

    const result = handler(fields, files);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (err) {
    log('ERROR', 'Handler error', { error: err.message });
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  log('DEBUG', `${req.method} ${url.pathname}`);

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML); return;
  }

  if (req.method === 'GET' && url.pathname === '/api/products') {
    const products = parseProducts();
    log('DEBUG', 'GET /api/products', { count: products.length });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products)); return;
  }

  if (req.method === 'POST' && url.pathname === '/add-product') {
    log('INFO', 'POST /add-product');
    await handleMultipart(req, res, (fields, files) => addProduct(fields, files));
    return;
  }

  if (req.method === 'DELETE' && url.pathname === '/delete-product') {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing slug query parameter' })); return;
    }
    try {
      log('INFO', 'DELETE /delete-product', { slug });
      const result = deleteProduct(slug);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (err) {
      log('ERROR', 'Delete failed', { error: err.message });
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/edit-product') {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing slug query parameter' })); return;
    }
    log('INFO', 'POST /edit-product', { slug });
    await handleMultipart(req, res, (fields, files) => updateProduct(slug, fields, files));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use.\n`);
    console.error(`  Kill the existing process with:\n`);
    console.error(`    kill -9 $(lsof -t -i:${PORT})\n`);
    console.error(`  Then run npm run admin again.\n`);
  } else {
    console.error(err);
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  log('INFO', `Fjordleather Admin listening on http://localhost:${PORT}`);
  console.log(`\n   http://localhost:${PORT}\n`);
  console.log('   Ctrl+C to stop\n');
});

function shutdown() {
  server.close(() => process.exit(0));
}
process.on('SIGINT',  shutdown);
process.on('SIGTERM', shutdown);
