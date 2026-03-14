import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ImageGallery from '@/components/image-gallery/ImageGallery';
import ProductCard from '@/components/product-card/ProductCard';
import Button from '@/components/common/Button';
import { getProductBySlug, getProductSlugs, getRelatedProducts } from '@/data/utils';
import { formatPrice } from '@/lib/utils';
import { CONTACT_EMAIL } from '@/lib/constants';

/* ── Static params for export ─────────────────────────────────── */

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

/* ── Metadata ──────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Fjordleather`,
    description: product.description,
  };
}

/* ── Page ──────────────────────────────────────────────────────── */

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  const inquiryHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Inquiry about ${product.name}`,
  )}&body=${encodeURIComponent(
    `Hello Fjordleather,\n\nI'm interested in the ${product.name}. Could you provide more information?`,
  )}`;

  return (
    <main id="main-content">
      {/* ── Product section ──────────────────────────────────────── */}
      <section
        aria-label={`${product.name} product detail`}
        style={{ paddingTop: '48px', paddingBottom: '80px' }}
      >
        <div className="container-fiord">
          {/* Two-column layout: 60/40 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0',
              alignItems: 'start',
            }}
            className="lg:grid-cols-[3fr_2fr] lg:gap-16"
          >
            {/* ── LEFT: Gallery ───────────────────────────────────── */}
            <div>
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* ── RIGHT: Product info ──────────────────────────────── */}
            <div
              style={{ paddingTop: '8px' }}
              className="mt-10 lg:mt-0"
            >
              <div
                className="lg:sticky"
                style={{ top: '120px' }}
              >
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" style={{ marginBottom: '28px' }}>
                  <ol
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '15px',
                      letterSpacing: '0.03em',
                      color: 'var(--color-stone)',
                    }}
                  >
                    <li>
                      <a
                        href="/"
                        style={{
                          color: 'var(--color-stone)',
                          textDecoration: 'none',
                          transition: 'color var(--duration-swift)',
                        }}
                      >
                        Homepage
                      </a>
                    </li>
                    <li aria-hidden="true" style={{ color: 'var(--color-stone)' }}>
                      /
                    </li>
                    <li>
                      <a
                        href="/catalog"
                        style={{
                          color: 'var(--color-stone)',
                          textDecoration: 'none',
                          transition: 'color var(--duration-swift)',
                        }}
                      >
                        Collection
                      </a>
                    </li>
                    <li aria-hidden="true" style={{ color: 'var(--color-stone)' }}>
                      /
                    </li>
                    <li
                      aria-current="page"
                      style={{ color: 'var(--color-obsidian)', fontWeight: 500 }}
                    >
                      {product.name}
                    </li>
                  </ol>
                </nav>

                {/* Category tag */}
                <p
                  className="text-style-overline"
                  style={{ color: 'var(--color-cognac)', marginBottom: '12px' }}
                >
                  {product.category}
                </p>

                {/* Product name */}
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(32px, 3vw, 40px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-obsidian)',
                    margin: 0,
                  }}
                >
                  {product.name}
                </h1>

                {/* Price */}
                <p
                  aria-label={`Price: ${formatPrice(product.price)}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: 1.3,
                    color: 'var(--color-obsidian)',
                    marginTop: '24px',
                  }}
                >
                  {formatPrice(product.price)}
                </p>

                {/* Divider */}
                <hr
                  style={{
                    border: 'none',
                    borderTop: '1px solid var(--color-stone)',
                    margin: '32px 0',
                  }}
                />

                {/* Product details grid */}
                <dl
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    columnGap: '32px',
                    rowGap: '12px',
                  }}
                >
                  <dt
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--color-stone)',
                      lineHeight: 1.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Material
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.5,
                      color: 'var(--color-obsidian)',
                      margin: 0,
                    }}
                  >
                    {product.material}
                  </dd>

                  <dt
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--color-stone)',
                      lineHeight: 1.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Construction
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.5,
                      color: 'var(--color-obsidian)',
                      margin: 0,
                    }}
                  >
                    {product.construction}
                  </dd>

                  {product.dimensions && (
                    <>
                      <dt
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 500,
                          fontSize: '15px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: 'var(--color-stone)',
                          lineHeight: 1.5,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Dimensions
                      </dt>
                      <dd
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 300,
                          fontSize: '14px',
                          lineHeight: 1.5,
                          color: 'var(--color-obsidian)',
                          margin: 0,
                        }}
                      >
                        {product.dimensions.height} × {product.dimensions.width} ×{' '}
                        {product.dimensions.depth} {product.dimensions.unit}
                      </dd>
                    </>
                  )}
                </dl>

                {/* Editorial description */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: 'var(--color-obsidian)',
                    marginTop: '24px',
                    maxWidth: '420px',
                  }}
                >
                  {product.description}
                </p>

                {/* CTA */}
                <div style={{ marginTop: '40px' }}>
                  <Button
                    variant="primary"
                    href={inquiryHref}
                    className="w-full lg:w-auto"
                  >
                    Inquire About This Piece →
                  </Button>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '15px',
                      color: 'var(--color-stone)',
                      marginTop: '16px',
                    }}
                  >
                    Or contact us directly at{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      style={{
                        color: 'var(--color-stone)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related products ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          aria-label="Related products"
          style={{
            marginTop: '80px',
            paddingTop: '64px',
            paddingBottom: '96px',
            backgroundColor: 'var(--color-linen)',
          }}
        >
          <div className="container-fiord">
            {/* Section heading */}
            <div style={{ marginBottom: '48px' }}>
              <p
                className="text-style-overline"
                style={{ color: 'var(--color-stone)', marginBottom: '12px' }}
              >
                You May Also Like
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: '36px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-obsidian)',
                  margin: 0,
                }}
              >
                From the Same Collection
              </h2>
            </div>

            {/* 3-column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '32px',
              }}
              className="sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
