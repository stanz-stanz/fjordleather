import Container from '@/components/common/Container'
import ProductCard from '@/components/product-card/ProductCard'
import AnimateOnScroll from '@/components/common/AnimateOnScroll'
import Link from 'next/link'
import { getFeaturedProducts } from '@/data/utils'

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 3)

  return (
    <main id="main-content">

      {/* ── HERO ──────────────────────────────────────────────────────
          Linen background — warm, not a whiteboard.
          Enormous left-aligned Cormorant. Editorial.
      ────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Fjordleather"
        style={{
          backgroundColor: '#F0E6D0',
          paddingTop: '96px',
          paddingBottom: '120px',
        }}
      >
        <Container>
          <div style={{ maxWidth: '820px' }}>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-cognac)',
              marginBottom: '40px',
            }}>
              Handmade leather goods — Oslo
            </p>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(60px, 9vw, 104px)',
              lineHeight: '0.95',
              letterSpacing: '-0.03em',
              color: 'var(--color-obsidian)',
              marginBottom: '48px',
            }}>
              Objects<br />
              that <em style={{ fontStyle: 'italic' }}>outlast</em><br />
              their owners.
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'var(--color-obsidian)',
              maxWidth: '380px',
              marginBottom: '40px',
            }}>
              Full-grain Italian leather, cut and stitched
              entirely by hand. No shortcuts.
            </p>

            <Link href="/catalog" className="cta-primary">
              View the Collection
            </Link>

          </div>
        </Container>
      </section>


      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────
          White section — contrast with warm linen above.
      ────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Selected works"
        style={{
          backgroundColor: 'var(--color-chalk)',
          borderTop: '1px solid var(--color-stone)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <Container>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '48px',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: 'var(--color-obsidian)',
              margin: 0,
            }}>
              Selected Works
            </h2>

            <Link href="/catalog" style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--color-stone)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-stone)',
              paddingBottom: '2px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
            }}>
              View all pieces
            </Link>
          </div>

          <AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '32px' }}>
              {featured.map((product, i) => (
                <div
                  key={product.id}
                  data-animate="fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <ProductCard product={product} priority={i === 0} />
                </div>
              ))}
            </div>
          </AnimateOnScroll>

        </Container>
      </section>


      {/* ── PULL QUOTE ────────────────────────────────────────────────
          Linen again — warm, editorial, large italic type.
      ────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Brand philosophy"
        style={{
          backgroundColor: 'var(--color-linen)',
          borderTop: '1px solid var(--color-stone)',
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        <Container>
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(30px, 4vw, 52px)',
            lineHeight: '1.35',
            letterSpacing: '-0.015em',
            color: 'var(--color-obsidian)',
            maxWidth: '820px',
            margin: '0 0 28px',
          }}>
            &ldquo;Leather is a living material. It marks time,
            absorbs habit, tells the story of its use. We make
            objects meant to age &mdash; that look better at forty
            years than at four days.&rdquo;
          </blockquote>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '0.1em',
            color: 'var(--color-stone)',
          }}>
            Fjordleather &mdash; Oslo
          </p>
        </Container>
      </section>


      {/* ── MATERIALS ─────────────────────────────────────────────────
          White section, three columns, cognac overlines.
      ────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Materials and construction"
        style={{
          backgroundColor: 'var(--color-chalk)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '48px' }}>
            {[
              {
                label: 'Full-Grain Italian Leather',
                body: 'Vegetable-tanned at Badalassi Carlo and Conceria Walpier. Selected for character, grain, and aging quality.',
              },
              {
                label: 'Hand-Stitched',
                body: 'Waxed linen thread throughout. Saddle-stitched for strength that outlasts machine sewing by decades.',
              },
              {
                label: 'Brass Hardware',
                body: 'Aged and unlacquered. Every buckle and clasp develops a unique patina alongside the leather.',
              },
            ].map(({ label, body }) => (
              <div key={label} style={{ borderTop: '1px solid var(--color-stone)', paddingTop: '24px' }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-cognac)',
                  marginBottom: '14px',
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '16px',
                  lineHeight: '1.75',
                  color: 'var(--color-obsidian)',
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </main>
  )
}
