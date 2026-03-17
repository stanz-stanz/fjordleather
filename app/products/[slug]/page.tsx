import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ImageGallery from '@/components/image-gallery/ImageGallery';
import ProductCard from '@/components/product-card/ProductCard';
import { getProductBySlug, getProductSlugs, getRelatedProducts, getAdjacentProducts } from '@/data/utils';
import { TANNERY_REGISTRY } from '@/data/tanneries';
import { formatPrice } from '@/lib/utils';
import ProductInquiryForm from '@/components/product-inquiry/ProductInquiryForm';

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

  const related  = getRelatedProducts(product, 3);
  const { prev, next } = getAdjacentProducts(product);

  return (
    <main id="main-content">
      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" style={{ borderBottom: '1px solid var(--color-stone)' }}>
        <div className="container-fiord">
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              listStyle: 'none',
              padding: '16px 0',
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '17px',
              letterSpacing: '0.03em',
              color: 'var(--color-stone)',
            }}
          >
            <li>
              <a href="/" style={{ color: 'var(--color-stone)', textDecoration: 'none' }}>
                Homepage
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                href={`/catalog?category=${product.category}`}
                style={{ color: 'var(--color-stone)', textDecoration: 'none' }}
              >
                {product.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: 'var(--color-obsidian)', fontWeight: 500 }}>
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Prev / Next navigation ───────────────────────────────────── */}
      <nav
        aria-label="Browse products"
        style={{
          borderBottom: '1px solid var(--color-stone)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Previous */}
        {prev ? (
          <a
            href={`/products/${prev.slug}`}
            style={{
              padding: '16px 32px',
              textDecoration: 'none',
              transition: 'background var(--duration-swift)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '15px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-stone)',
            }}
            className="hover:bg-linen"
          >
            ← Previous
          </a>
        ) : (
          <span />
        )}

        {/* Next */}
        {next ? (
          <a
            href={`/products/${next.slug}`}
            style={{
              padding: '16px 32px',
              textDecoration: 'none',
              transition: 'background var(--duration-swift)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '15px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-stone)',
              textAlign: 'right',
              display: 'block',
            }}
            className="hover:bg-linen"
          >
            Next →
          </a>
        ) : (
          <span />
        )}
      </nav>

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
                    fontSize: 'clamp(36px, 3vw, 44px)',
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
                  aria-label={`Price: ${formatPrice(product.price, product.currency)}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '27px',
                    lineHeight: 1.3,
                    color: 'var(--color-obsidian)',
                    marginTop: '24px',
                  }}
                >
                  {formatPrice(product.price, product.currency)}
                </p>

                {/* Divider */}
                <hr
                  style={{
                    border: 'none',
                    borderTop: '1px solid var(--color-stone)',
                    margin: '32px 0',
                  }}
                />

                {/* Details + certification badge side by side */}
                <div
                  style={{ gap: '32px' }}
                  className="flex flex-col lg:flex-row items-stretch"
                >
                  {/* Left: details grid + description */}
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>

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
                          fontSize: '20px',
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
                          fontSize: '19px',
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
                          fontSize: '20px',
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
                          fontSize: '19px',
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
                              fontSize: '20px',
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
                              fontSize: '19px',
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

                    {/* Editorial description — double newline = paragraph, single newline = line break */}
                    <div style={{ marginTop: '24px', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '1em' }}>
                      {product.description.split(/\n\n+/).map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            fontSize: '21px',
                            lineHeight: 1.75,
                            color: 'var(--color-obsidian)',
                            margin: 0,
                          }}
                        >
                          {para.trim().split('\n').map((line, j, arr) => (
                            <span key={j}>
                              {line}
                              {j < arr.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Vertical divider — desktop only */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:block"
                    style={{
                      width: '1px',
                      backgroundColor: 'var(--color-stone)',
                      flexShrink: 0,
                    }}
                  />

                  {/* Certification badge */}
                  <aside
                    aria-label="Leather certification"
                    style={{
                      flex: '0 0 300px',
                      border: '1px solid var(--color-stone)',
                      backgroundColor: '#F0E6D0',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/pelle-vegetale-logo.jpg"
                      alt="Pelle Conciata al Vegetale in Toscana — Made in Italy consortium mark"
                      style={{ width: '200px', height: 'auto', display: 'block' }}
                    />
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: '17px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-obsidian)',
                        margin: '16px 0 0',
                        textAlign: 'center',
                      }}
                    >
                      Certified Leather
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingBottom: '16px' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 300,
                          fontSize: '20px',
                          lineHeight: 1.6,
                          color: 'var(--color-obsidian)',
                          margin: 0,
                          textAlign: 'center',
                        }}
                      >
                        Vegetable-tanned in Tuscany using centuries-old methods. Free of harmful chemicals, aged to perfection.
                      </p>
                      <a
                        href="https://www.pellealvegetale.it/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 400,
                          fontSize: '19px',
                          letterSpacing: '0.01em',
                          color: 'var(--color-cognac)',
                          textDecoration: 'none',
                          transition: 'opacity var(--duration-swift)',
                        }}
                      >
                        Learn more &#8594;
                      </a>
                    </div>

                    {/* Tannery logo inside badge */}
                    {product.tannery && product.tannery.map((t, i) => {
                      const info = TANNERY_REGISTRY[t.name];
                      if (!info?.logo) return null;
                      const url = t.url ?? info.url;
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            borderTop: '1px solid var(--color-stone)',
                            paddingTop: '16px',
                            width: '100%',
                          }}
                        >
                          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-stone)', margin: 0, textAlign: 'center' }}>
                            Featured tannery:
                          </p>
                          {url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={info.logo} alt={`${t.name} tannery logo`} style={{ width: '200px', height: 'auto', display: 'block' }} />
                            </a>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={info.logo} alt={`${t.name} tannery logo`} style={{ width: '200px', height: 'auto', display: 'block' }} />
                          )}
                        </div>
                      );
                    })}
                  </aside>
                </div>

                {/* CTA */}
                <div style={{ marginTop: '40px' }}>
                  <ProductInquiryForm productName={product.name} productSlug={product.slug} />
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
            marginTop: '48px',
            paddingTop: '40px',
            paddingBottom: '56px',
            backgroundColor: 'var(--color-linen)',
          }}
        >
          <div className="container-fiord">
            {/* Section heading */}
            <div style={{ marginBottom: '32px' }}>
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
                gridTemplateColumns: 'repeat(3, minmax(0, 200px))',
                gap: '16px',
              }}
            >
              {related.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
