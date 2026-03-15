#!/usr/bin/env node
/**
 * Fjordleather — Product Import Script
 * Usage: npm run add-product -- path/to/product.json
 *
 * The JSON file must follow the format in data/product-intake.example.json.
 * Image files referenced in the JSON must live in the same directory as the JSON.
 */

import fs from 'fs';
import path from 'path';

// ── Helpers ────────────────────────────────────────────────────────────────

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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

function buildProductEntry(data, slug, id) {
  const images = data.images
    .map((img, i) => {
      const ext = path.extname(img.file).toLowerCase() || '.jpg';
      const src = `/images/products/${slug}-${i + 1}${ext}`;
      return `      { src: '${src}', alt: '${img.alt.replace(/'/g, "\\'")}', priority: ${i === 0} }`;
    })
    .join(',\n');

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
    ],
  },`;
}

// ── Validation ─────────────────────────────────────────────────────────────

const VALID_CATEGORIES = ['bags', 'wallets'];

function validate(data, jsonPath) {
  const required = ['name', 'category', 'price', 'currency',
    'description', 'construction', 'dimensions', 'images'];
  const missing = required.filter((k) => data[k] === undefined);
  if (missing.length) {
    console.error(`\n❌  Missing required fields: ${missing.join(', ')}\n`);
    process.exit(1);
  }
  if (!VALID_CATEGORIES.includes(data.category)) {
    console.error(`\n❌  Invalid category: "${data.category}"\n    Must be one of: ${VALID_CATEGORIES.join(' · ')}\n`);
    process.exit(1);
  }
  if (!Array.isArray(data.images) || data.images.length === 0) {
    console.error('\n❌  "images" must be a non-empty array\n');
    process.exit(1);
  }
  const dir = path.dirname(jsonPath);
  data.images.forEach((img, i) => {
    if (!img.file || !img.alt) {
      console.error(`\n❌  images[${i}] must have "file" and "alt" fields\n`);
      process.exit(1);
    }
    const imgPath = path.resolve(dir, img.file);
    if (!fs.existsSync(imgPath)) {
      console.error(`\n❌  Image not found: ${imgPath}\n    Make sure "${img.file}" is in the same folder as the JSON.\n`);
      process.exit(1);
    }
  });
}

// ── Main ───────────────────────────────────────────────────────────────────

const jsonArg = process.argv[2];
if (!jsonArg) {
  console.error('\nUsage: npm run add-product -- path/to/product.json\n');
  process.exit(1);
}

const jsonPath = path.resolve(process.cwd(), jsonArg);
if (!fs.existsSync(jsonPath)) {
  console.error(`\n❌  File not found: ${jsonPath}\n`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
} catch (e) {
  console.error(`\n❌  Could not parse JSON: ${e.message}\n`);
  process.exit(1);
}

validate(data, jsonPath);

const slug = slugify(data.name);
const productsFile = path.resolve(process.cwd(), 'data/products.ts');
const productsSource = fs.readFileSync(productsFile, 'utf-8');

// Check for duplicate slug
if (productsSource.includes(`slug: '${slug}'`)) {
  console.error(`\n❌  A product with slug "${slug}" already exists in data/products.ts\n`);
  process.exit(1);
}

const id = nextProductId(productsSource);
const entry = buildProductEntry(data, slug, id);

// Copy images
const destDir = path.resolve(process.cwd(), 'public/images/products');
fs.mkdirSync(destDir, { recursive: true });
const dir = path.dirname(jsonPath);

console.log('\n📦  Fjordleather — adding product\n');
console.log(`    Name:     ${data.name}`);
console.log(`    Slug:     ${slug}`);
console.log(`    ID:       ${id}`);
console.log(`    Category: ${data.category}`);
console.log(`    Price:    ${data.currency} ${data.price}`);
console.log(`    Images:   ${data.images.length}`);
console.log('');

data.images.forEach((img, i) => {
  const ext = path.extname(img.file).toLowerCase() || '.jpg';
  const dest = path.join(destDir, `${slug}-${i + 1}${ext}`);
  fs.copyFileSync(path.resolve(dir, img.file), dest);
  console.log(`    ✓ Copied ${img.file} → public/images/products/${slug}-${i + 1}${ext}`);
});

// Append product to products.ts — insert before the closing ];
const updated = productsSource.replace(
  /(\];\s*$)/,
  `${entry}\n$1`
);

if (updated === productsSource) {
  console.error('\n❌  Could not locate end of products array in data/products.ts\n');
  process.exit(1);
}

fs.writeFileSync(productsFile, updated, 'utf-8');
console.log(`\n    ✓ Appended to data/products.ts`);
console.log(`\n✅  Done. Run "npm run build" to verify, or check http://localhost:3000/products/${slug}\n`);
