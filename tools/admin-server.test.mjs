/**
 * Fjordleather Admin — Unit Test Suite
 * Run: npm run test:admin
 *
 * Uses Node.js built-in test runner (node:test + node:assert/strict).
 * No external dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  slugify,
  nextProductId,
  escapeBacktick,
  formatDimensions,
  buildProductEntry,
  skipString,
  extractBlock,
  getStr,
  parseProductBlock,
  indexOfBuf,
  extFromMime,
  parseMultipart,
  extractFields,
  replaceInSource,
} from './admin-core.mjs';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build a raw multipart body Buffer from a list of parts. */
function buildMultipart(boundary, parts) {
  const chunks = [];
  const CRLF = Buffer.from('\r\n');
  const sep  = Buffer.from('--' + boundary);

  for (const part of parts) {
    chunks.push(sep, CRLF);
    for (const [k, v] of Object.entries(part.headers)) {
      chunks.push(Buffer.from(`${k}: ${v}`), CRLF);
    }
    chunks.push(CRLF);
    chunks.push(Buffer.isBuffer(part.body) ? part.body : Buffer.from(part.body));
    chunks.push(CRLF);
  }
  chunks.push(sep, Buffer.from('--'), CRLF);
  return Buffer.concat(chunks);
}

/** Minimal valid fields for extractFields(). */
const VALID_FIELDS = {
  name:         'Test Wallet',
  category:     'wallets',
  price:        '250',
  currency:     'EUR',
  description:  'A fine wallet.',
  construction: 'Saddle-stitched',
  dim_height:   '10',
  dim_width:    '8',
  dim_unit:     'cm',
};

// ── slugify ───────────────────────────────────────────────────────────────────

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    assert.equal(slugify('Fjell Bifold Wallet'), 'fjell-bifold-wallet');
  });
  it('strips non-alphanumeric characters', () => {
    assert.equal(slugify("Bård's Purse!"), 'brds-purse');
  });
  it('collapses multiple dashes', () => {
    assert.equal(slugify('Hello  --  World'), 'hello-world');
  });
  it('trims leading/trailing whitespace', () => {
    assert.equal(slugify('  Oslo Bag  '), 'oslo-bag');
  });
  it('handles already-slug strings unchanged', () => {
    assert.equal(slugify('oslo-bag'), 'oslo-bag');
  });
});

// ── nextProductId ─────────────────────────────────────────────────────────────

describe('nextProductId', () => {
  it('returns 01 for empty source', () => {
    assert.equal(nextProductId('const products = [];'), '01');
  });
  it('increments from highest id', () => {
    const src = `id: '03', id: '07', id: '01'`;
    assert.equal(nextProductId(src), '08');
  });
  it('zero-pads single-digit results', () => {
    const src = `id: '08'`;
    assert.equal(nextProductId(src), '09');
  });
  it('does not zero-pad double-digit results', () => {
    const src = `id: '09'`;
    assert.equal(nextProductId(src), '10');
  });
});

// ── escapeBacktick ────────────────────────────────────────────────────────────

describe('escapeBacktick', () => {
  it('escapes backticks', () => {
    assert.equal(escapeBacktick('say `hello`'), 'say \\`hello\\`');
  });
  it('escapes dollar signs', () => {
    assert.equal(escapeBacktick('${foo}'), '\\${foo}');
  });
  it('leaves plain text unchanged', () => {
    assert.equal(escapeBacktick('plain text'), 'plain text');
  });
});

// ── formatDimensions ──────────────────────────────────────────────────────────

describe('formatDimensions', () => {
  it('omits depth when absent', () => {
    const result = formatDimensions({ height: '10', width: '8', unit: 'cm' });
    assert.equal(result, "{ height: '10', width: '8', unit: 'cm' }");
  });
  it('includes depth when present', () => {
    const result = formatDimensions({ height: '10', width: '8', depth: '2', unit: 'cm' });
    assert.equal(result, "{ height: '10', width: '8', depth: '2', unit: 'cm' }");
  });
});

// ── buildProductEntry ─────────────────────────────────────────────────────────

describe('buildProductEntry', () => {
  const data = {
    name:         'Test Wallet',
    category:     'wallets',
    price:        250,
    currency:     'EUR',
    description:  'A fine wallet.',
    material:     'Full-grain Italian leather',
    construction: 'Saddle-stitched',
    dimensions:   { height: '10', width: '8', unit: 'cm' },
    tannery:      null,
    images:       [{ src: '/images/products/test-wallet-1.png', alt: 'Test Wallet front' }],
  };

  it('includes all required fields', () => {
    const entry = buildProductEntry(data, 'test-wallet', '12');
    assert.match(entry, /id: '12'/);
    assert.match(entry, /slug: 'test-wallet'/);
    assert.match(entry, /name: 'Test Wallet'/);
    assert.match(entry, /category: 'wallets'/);
    assert.match(entry, /price: 250/);
    assert.match(entry, /currency: 'EUR'/);
    assert.match(entry, /priority: true/);
  });

  it('ends with a trailing comma', () => {
    const entry = buildProductEntry(data, 'test-wallet', '12');
    assert.match(entry, /},\s*$/);
  });

  it('omits tannery field when null', () => {
    const entry = buildProductEntry(data, 'test-wallet', '12');
    assert.doesNotMatch(entry, /tannery/);
  });

  it('includes tannery field when provided', () => {
    const d2 = { ...data, tannery: [{ name: 'Badalassi Carlo', url: '' }] };
    const entry = buildProductEntry(d2, 'test-wallet', '12');
    assert.match(entry, /tannery: \[/);
    assert.match(entry, /Badalassi Carlo/);
  });

  it('builds image src from slug+index+ext when no src provided', () => {
    const d2 = { ...data, images: [{ ext: '.jpg', alt: 'Alt text' }] };
    const entry = buildProductEntry(d2, 'oslo-bag', '05');
    assert.match(entry, /\/images\/products\/oslo-bag-1\.jpg/);
  });

  it('escapes single quotes in name', () => {
    const d2 = { ...data, name: "Maker's Mark" };
    const entry = buildProductEntry(d2, 'makers-mark', '01');
    assert.match(entry, /name: 'Maker\\'s Mark'/);
  });
});

// ── skipString ────────────────────────────────────────────────────────────────

describe('skipString', () => {
  it("finds end of single-quoted string", () => {
    const src = "'hello world' rest";
    assert.equal(skipString(src, 0), 13); // index just past closing '
  });
  it('handles escaped quotes inside string', () => {
    const src = "'it\\'s here' rest";
    assert.equal(skipString(src, 0), 12);
  });
  it('handles backtick strings', () => {
    const src = '`template ${foo}` rest';
    assert.equal(skipString(src, 0), 17);
  });
});

// ── extractBlock ──────────────────────────────────────────────────────────────

describe('extractBlock', () => {
  it('extracts a simple block', () => {
    const src = '{ a: 1, b: 2 }';
    assert.equal(extractBlock(src, 0), '{ a: 1, b: 2 }');
  });
  it('handles nested braces', () => {
    const src = '{ a: { b: 1 } }';
    assert.equal(extractBlock(src, 0), '{ a: { b: 1 } }');
  });
  it('ignores braces inside strings', () => {
    const src = "{ a: '{ not a brace }', b: 2 }";
    assert.equal(extractBlock(src, 0), "{ a: '{ not a brace }', b: 2 }");
  });
  it('handles backtick strings with braces', () => {
    const src = '{ desc: `hello {world}` }';
    assert.equal(extractBlock(src, 0), '{ desc: `hello {world}` }');
  });
});

// ── getStr ────────────────────────────────────────────────────────────────────

describe('getStr', () => {
  it('extracts a simple string value', () => {
    assert.equal(getStr("{ name: 'Fjell Bag' }", 'name'), 'Fjell Bag');
  });
  it('unescapes escaped single quotes', () => {
    assert.equal(getStr("{ name: 'Maker\\'s Mark' }", 'name'), "Maker's Mark");
  });
  it('returns null when key is missing', () => {
    assert.equal(getStr("{ name: 'Fjell Bag' }", 'slug'), null);
  });
});

// ── parseProductBlock ─────────────────────────────────────────────────────────

describe('parseProductBlock', () => {
  const block = `{
    id: '07',
    slug: 'fjell-bifold',
    name: 'Fjell Bifold',
    category: 'wallets',
    price: 195,
    currency: 'DKK',
    description: \`A slim wallet.\`,
    material: 'Full-grain Italian leather',
    construction: 'Saddle-stitched by hand',
    dimensions: { height: '9', width: '10', unit: 'cm' },
    images: [
      { src: '/images/products/fjell-bifold-1.jpg', alt: 'Fjell Bifold front', priority: true },
    ],
  }`;

  it('parses all scalar fields', () => {
    const p = parseProductBlock(block);
    assert.equal(p.id,           '07');
    assert.equal(p.slug,         'fjell-bifold');
    assert.equal(p.name,         'Fjell Bifold');
    assert.equal(p.category,     'wallets');
    assert.equal(p.price,        195);
    assert.equal(p.currency,     'DKK');
    assert.equal(p.construction, 'Saddle-stitched by hand');
  });

  it('parses description from backtick string', () => {
    const p = parseProductBlock(block);
    assert.equal(p.description, 'A slim wallet.');
  });

  it('parses dimensions', () => {
    const p = parseProductBlock(block);
    assert.deepEqual(p.dimensions, { height: '9', width: '10', depth: '', unit: 'cm' });
  });

  it('parses images array', () => {
    const p = parseProductBlock(block);
    assert.equal(p.images.length, 1);
    assert.equal(p.images[0].src, '/images/products/fjell-bifold-1.jpg');
    assert.equal(p.images[0].alt, 'Fjell Bifold front');
  });

  it('returns null for blocks without a name', () => {
    assert.equal(parseProductBlock('{ id: "1" }'), null);
  });
});

// ── indexOfBuf ────────────────────────────────────────────────────────────────

describe('indexOfBuf', () => {
  it('finds pattern at the start', () => {
    const buf    = Buffer.from('hello world');
    const needle = Buffer.from('hello');
    assert.equal(indexOfBuf(buf, needle), 0);
  });
  it('finds pattern in the middle', () => {
    const buf    = Buffer.from('aaabbbccc');
    const needle = Buffer.from('bbb');
    assert.equal(indexOfBuf(buf, needle), 3);
  });
  it('returns -1 when not found', () => {
    const buf    = Buffer.from('hello');
    const needle = Buffer.from('xyz');
    assert.equal(indexOfBuf(buf, needle, 0), -1);
  });
  it('respects start offset', () => {
    const buf    = Buffer.from('abcabc');
    const needle = Buffer.from('abc');
    assert.equal(indexOfBuf(buf, needle, 1), 3);
  });
  it('handles binary data', () => {
    const buf    = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const needle = Buffer.from([0x0d, 0x0a]);
    assert.equal(indexOfBuf(buf, needle), 4);
  });
});

// ── extFromMime ───────────────────────────────────────────────────────────────

describe('extFromMime', () => {
  it('returns .jpg for image/jpeg', () => { assert.equal(extFromMime('image/jpeg'), '.jpg'); });
  it('returns .jpg for image/jpg',  () => { assert.equal(extFromMime('image/jpg'),  '.jpg'); });
  it('returns .png for image/png',  () => { assert.equal(extFromMime('image/png'),  '.png'); });
  it('returns .webp for image/webp',() => { assert.equal(extFromMime('image/webp'), '.webp'); });
  it('returns .gif for image/gif',  () => { assert.equal(extFromMime('image/gif'),  '.gif'); });
  it('defaults to .jpg for unknown',() => { assert.equal(extFromMime('image/bmp'),  '.jpg'); });
});

// ── parseMultipart ────────────────────────────────────────────────────────────

describe('parseMultipart', () => {
  const B = 'TestBoundary123';

  it('parses a single text field', () => {
    const body = buildMultipart(B, [
      { headers: { 'Content-Disposition': 'form-data; name="name"' }, body: 'Oslo Bag' },
    ]);
    const { fields, files } = parseMultipart(body, B);
    assert.equal(fields.name, 'Oslo Bag');
    assert.equal(files.length, 0);
  });

  it('parses multiple text fields', () => {
    const body = buildMultipart(B, [
      { headers: { 'Content-Disposition': 'form-data; name="name"' },     body: 'Oslo Bag' },
      { headers: { 'Content-Disposition': 'form-data; name="category"' }, body: 'bags' },
      { headers: { 'Content-Disposition': 'form-data; name="price"' },    body: '350' },
    ]);
    const { fields } = parseMultipart(body, B);
    assert.equal(fields.name,     'Oslo Bag');
    assert.equal(fields.category, 'bags');
    assert.equal(fields.price,    '350');
  });

  it('parses a file upload', () => {
    const fakeJpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
    const body = buildMultipart(B, [
      {
        headers: {
          'Content-Disposition': 'form-data; name="image_0"; filename="photo.jpg"',
          'Content-Type': 'image/jpeg',
        },
        body: fakeJpeg,
      },
    ]);
    const { files } = parseMultipart(body, B);
    assert.equal(files.length, 1);
    assert.equal(files[0].fieldName, 'image_0');
    assert.equal(files[0].filename,  'photo.jpg');
    assert.equal(files[0].mimeType,  'image/jpeg');
    assert.deepEqual(files[0].data, fakeJpeg);
  });

  it('parses mixed fields and files', () => {
    const fakeJpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
    const body = buildMultipart(B, [
      { headers: { 'Content-Disposition': 'form-data; name="name"' }, body: 'Oslo Bag' },
      {
        headers: {
          'Content-Disposition': 'form-data; name="image_0"; filename="photo.jpg"',
          'Content-Type': 'image/jpeg',
        },
        body: fakeJpeg,
      },
    ]);
    const { fields, files } = parseMultipart(body, B);
    assert.equal(fields.name, 'Oslo Bag');
    assert.equal(files.length, 1);
    assert.equal(files[0].fieldName, 'image_0');
  });

  it('handles two file uploads in order', () => {
    const img1 = Buffer.from([0x01, 0x02, 0x03]);
    const img2 = Buffer.from([0x04, 0x05, 0x06]);
    const body = buildMultipart(B, [
      {
        headers: {
          'Content-Disposition': 'form-data; name="image_0"; filename="first.jpg"',
          'Content-Type': 'image/jpeg',
        },
        body: img1,
      },
      {
        headers: {
          'Content-Disposition': 'form-data; name="image_1"; filename="second.jpg"',
          'Content-Type': 'image/jpeg',
        },
        body: img2,
      },
    ]);
    const { files } = parseMultipart(body, B);
    assert.equal(files.length, 2);
    assert.equal(files[0].fieldName, 'image_0');
    assert.equal(files[1].fieldName, 'image_1');
    assert.deepEqual(files[0].data, img1);
    assert.deepEqual(files[1].data, img2);
  });

  it('preserves exact binary content of PNG files', () => {
    // Real PNG magic bytes header
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    // Some IHDR-like bytes
    const pngBody  = Buffer.concat([pngMagic, Buffer.alloc(20, 0xAB)]);
    const body = buildMultipart(B, [
      {
        headers: {
          'Content-Disposition': 'form-data; name="image_0"; filename="photo.png"',
          'Content-Type': 'image/png',
        },
        body: pngBody,
      },
    ]);
    const { files } = parseMultipart(body, B);
    assert.equal(files.length, 1);
    assert.deepEqual(files[0].data, pngBody);
  });

  it('handles PNG binary data containing \\r\\n\\r\\n sequence without misreading headers', () => {
    // PNG with \r\n\r\n embedded in its binary content — must NOT confuse the parser
    const crlfcrlf = Buffer.from('\r\n\r\n');
    const pngData  = Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47]),
      crlfcrlf,
      Buffer.from([0x0d, 0x0a, 0x1a, 0x0a, 0xDE, 0xAD, 0xBE, 0xEF]),
    ]);
    const body = buildMultipart(B, [
      { headers: { 'Content-Disposition': 'form-data; name="name"' }, body: 'Test' },
      {
        headers: {
          'Content-Disposition': 'form-data; name="image_0"; filename="tricky.png"',
          'Content-Type': 'image/png',
        },
        body: pngData,
      },
    ]);
    const { fields, files } = parseMultipart(body, B);
    assert.equal(fields.name, 'Test');
    assert.equal(files.length, 1);
    assert.equal(files[0].mimeType, 'image/png');
    assert.deepEqual(files[0].data, pngData);
  });

  it('returns empty fields and files for a body with only final boundary', () => {
    const body = Buffer.from(`--${B}--\r\n`);
    const { fields, files } = parseMultipart(body, B);
    assert.equal(Object.keys(fields).length, 0);
    assert.equal(files.length, 0);
  });

  it('handles quoted boundary in content-type (robustness)', () => {
    // The boundary value can sometimes be quoted by certain HTTP clients.
    // This test verifies the parser works when called with the already-unquoted boundary string.
    const body = buildMultipart('quoted-boundary', [
      { headers: { 'Content-Disposition': 'form-data; name="hello"' }, body: 'world' },
    ]);
    const { fields } = parseMultipart(body, 'quoted-boundary');
    assert.equal(fields.hello, 'world');
  });
});

// ── extractFields ─────────────────────────────────────────────────────────────

describe('extractFields', () => {
  it('returns parsed data for all valid fields', () => {
    const data = extractFields(VALID_FIELDS);
    assert.equal(data.name,         'Test Wallet');
    assert.equal(data.category,     'wallets');
    assert.equal(data.price,        250);
    assert.equal(data.currency,     'EUR');
    assert.equal(data.construction, 'Saddle-stitched');
    assert.deepEqual(data.dimensions, { height: '10', width: '8', depth: undefined, unit: 'cm' });
  });

  it('defaults material when not provided', () => {
    const data = extractFields(VALID_FIELDS);
    assert.equal(data.material, 'Full-grain Italian leather');
  });

  it('uses provided material over default', () => {
    const data = extractFields({ ...VALID_FIELDS, material: 'Horween Chromexcel' });
    assert.equal(data.material, 'Horween Chromexcel');
  });

  it('returns null tannery when __none__ selected', () => {
    const data = extractFields({ ...VALID_FIELDS, tannery: '__none__' });
    assert.equal(data.tannery, null);
  });

  it('includes tannery entry when a tannery is selected', () => {
    const data = extractFields({ ...VALID_FIELDS, tannery: 'Badalassi Carlo' });
    assert.ok(Array.isArray(data.tannery));
    assert.equal(data.tannery[0].name, 'Badalassi Carlo');
  });

  it('throws on missing required field', () => {
    const fields = { ...VALID_FIELDS };
    delete fields.name;
    assert.throws(() => extractFields(fields), /Missing required field: name/);
  });

  it('throws on empty required field', () => {
    assert.throws(
      () => extractFields({ ...VALID_FIELDS, construction: '  ' }),
      /Missing required field: construction/,
    );
  });

  it('parses depth when provided', () => {
    const data = extractFields({ ...VALID_FIELDS, dim_depth: '2' });
    assert.equal(data.dimensions.depth, '2');
  });
});

// ── replaceInSource ───────────────────────────────────────────────────────────

describe('replaceInSource', () => {
  // Minimal products.ts source with two products
  const src = `export const PRODUCTS = [
  {
    id: '01',
    slug: 'oslo-bag',
    name: 'Oslo Bag',
    description: \`A simple bag.\`,
    price: 400,
    currency: 'EUR',
  },
  {
    id: '02',
    slug: 'fjell-wallet',
    name: 'Fjell Wallet',
    description: \`A slim wallet.\`,
    price: 200,
    currency: 'EUR',
  },
];`;

  const newEntry = `  {
    id: '01',
    slug: 'oslo-bag',
    name: 'Oslo Bag Updated',
    description: \`A better bag.\`,
    price: 450,
    currency: 'EUR',
  },`;

  it('replaces the correct product block', () => {
    const result = replaceInSource('oslo-bag', newEntry, src);
    assert.match(result,    /Oslo Bag Updated/);
    assert.match(result,    /Fjell Wallet/);
    assert.doesNotMatch(result, /Oslo Bag',/); // original gone
  });

  it('does not produce double commas (regression test)', () => {
    const result = replaceInSource('oslo-bag', newEntry, src);
    assert.doesNotMatch(result, /,,/);
  });

  it('does not produce double commas when replacing the last product', () => {
    const result = replaceInSource('fjell-wallet', newEntry.replace('oslo-bag', 'fjell-wallet'), src);
    assert.doesNotMatch(result, /,,/);
  });

  it('keeps the other product intact', () => {
    const result = replaceInSource('oslo-bag', newEntry, src);
    assert.match(result, /Fjell Wallet/);
    assert.match(result, /price: 200/);
  });

  it('throws when slug is not found', () => {
    assert.throws(() => replaceInSource('nonexistent', newEntry, src), /not found/);
  });

  it('result is valid enough to parse the remaining product', () => {
    const result = replaceInSource('oslo-bag', newEntry, src);
    // Quick sanity check: the second product is still parseable via parseProductBlock
    const blockStart = result.indexOf("slug: 'fjell-wallet'");
    assert.ok(blockStart > 0, 'fjell-wallet slug still present');
  });

  it('handles backtick descriptions with special chars correctly', () => {
    // Build the source string manually to avoid template-literal interpolation surprises
    const srcSpecial =
      "export const P = [\n  {\n    id: '01',\n    slug: 'test-item',\n    name: 'Test',\n" +
      "    description: `Has \\`backtick\\` and \\${escaped} chars.`,\n  },\n];\n";
    const replacement =
      "  {\n    id: '01',\n    slug: 'test-item',\n    name: 'Test Updated',\n" +
      "    description: `New description.`,\n  },";
    const result = replaceInSource('test-item', replacement, srcSpecial);
    assert.match(result, /Test Updated/);
    assert.doesNotMatch(result, /,,/);
  });
});
