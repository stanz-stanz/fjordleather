import Container from '@/components/common/Container'
import HeroHeading from '@/components/hero/HeroHeading'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main id="main-content">

      {/* ── HERO ──────────────────────────────────────────────────────
          Linen background — warm, not a whiteboard.
          Enormous left-aligned Cormorant. Editorial.
      ────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Fjordleather"
        style={{
          backgroundColor: '#DED0B6',
          paddingTop: '64px',
          paddingBottom: '88px',
        }}
      >
        <Container>
          <div style={{ maxWidth: '820px' }}>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-cognac)',
              marginBottom: '40px',
            }}>
              Handmade in Vejle, Denmark
            </p>

            <HeroHeading />

            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '17px',
              lineHeight: '1.7',
              color: 'var(--color-obsidian)',
              maxWidth: '380px',
              marginBottom: '40px',
            }}>
              Every cut, every stitch, by hand alone. 
              No shortcuts. No compromise.
            </p>

            <Link href="/catalog" className="cta-primary">
              View our Collections
            </Link>

          </div>
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
            fontSize: 'clamp(29px, 3.8vw, 50px)',
            lineHeight: '1.35',
            letterSpacing: '-0.015em',
            color: 'var(--color-obsidian)',
            maxWidth: '820px',
            margin: '0 0 28px',
          }}>
            &ldquo;Being made <strong style={{ fontWeight: 700 }}>by</strong> human hands, the craft is made <strong style={{ fontWeight: 700 }}>for</strong> human hands &mdash; we can not only see it 
            but caress it with our fingers&rdquo;
          </blockquote>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '14px',
            letterSpacing: '0.1em',
            color: 'var(--color-stone)',
          }}>
            Malcolm McCollough &mdash;{' '}
            <a
              href="https://mitpress.mit.edu/9780262631891/abstracting-craft/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderBottom: '1px solid currentColor', paddingBottom: '1px' }}
            >
              Abstracting Craft
            </a>
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
                body: 'Only Vegetable-tanned from Tuscany. Selected for character, grain, and aging quality.',
              },
              {
                label: 'Hand-Stitched',
                body: 'Waxed nylon and polyester thread throughout. Saddle-stitched for strength that outlasts machine sewing by decades.',
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
