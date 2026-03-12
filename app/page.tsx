import Link from 'next/link'
import Navigation from '@/components/nav/Navigation'
import Footer from '@/components/footer/Footer'
import Container from '@/components/common/Container'
import ProductCard from '@/components/product-card/ProductCard'
import AnimateOnScroll from '@/components/common/AnimateOnScroll'
import { getFeaturedProducts } from '@/data/utils'

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 3)

  return (
    <>
      <Navigation />

      <main id="main-content">

        {/* ════════════════════════════════════════════
            SECTION 1 — Hero
            Full-viewport height. Typography-led.
            Left 60% text, right 40% image placeholder.
        ════════════════════════════════════════════ */}
        <section
          aria-label="Fjordleather — handmade leather goods"
          className="min-h-screen bg-chalk flex flex-col lg:flex-row pt-[72px]"
        >
          {/* On mobile: image first, text below */}

          {/* ── Right: Image (mobile: order 1) ─── */}
          <div
            className="
              order-first lg:order-last
              w-full h-[50vw]
              lg:w-[40%] lg:h-auto lg:min-h-screen
              flex-shrink-0
            "
          >
            <div
              className="
                w-full h-full
                bg-linen
                flex items-center justify-center
              "
            >
              <span
                className="
                  font-display italic font-light text-[15px]
                  text-stone/60
                  tracking-wide
                  select-none
                "
                aria-hidden="true"
              >
                [ Product photography ]
              </span>
            </div>
          </div>

          {/* ── Left: Text content ─────────────── */}
          <div
            className="
              order-last lg:order-first
              w-full lg:w-[60%]
              flex items-center
              px-6 py-16
              lg:px-16 lg:py-0
              xl:px-24
            "
          >
            <div className="max-w-[560px]">

              {/* Overline */}
              <p
                className="
                  text-style-overline text-stone
                  mb-8
                "
                style={{ animationDelay: '0ms' }}
              >
                Full-grain Italian leather. Made by hand.
              </p>

              {/* Hero headline */}
              <h1
                className="
                  font-display font-light text-obsidian
                  mb-10
                "
                style={{
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.02em',
                }}
              >
                Objects that
                <br />
                <em style={{ fontStyle: 'italic' }}>outlast</em>
                <br />
                their owners.
              </h1>

              {/* Body copy */}
              <p
                className="
                  font-body font-light text-stone
                  mb-10
                "
                style={{
                  fontSize: '17px',
                  lineHeight: '1.7',
                  maxWidth: '440px',
                }}
              >
                Every piece is cut, stitched, and burnished by hand in our
                workshop. Full-grain Italian leather. No compromises.
              </p>

              {/* CTA — ghost link */}
              <Link
                href="/catalog"
                className="
                  inline-block
                  font-body font-normal text-obsidian uppercase
                  border-b border-obsidian
                  pb-px
                  hover:opacity-60
                  transition-opacity duration-300
                "
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                }}
              >
                View the Collection →
              </Link>

            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            SECTION 2 — Featured Products
            Asymmetric cascade grid. Editorial, not retail.
        ════════════════════════════════════════════ */}
        <AnimateOnScroll>
          <section
            aria-label="Selected works"
            className="bg-chalk"
            style={{ paddingTop: 'var(--space-5xl)', paddingBottom: 'var(--space-5xl)' }}
          >
            <Container>

              {/* Section header */}
              <div className="mb-16">
                <p className="text-style-overline text-stone mb-4">
                  The Collection
                </p>
                <h2 className="text-style-headline text-obsidian">
                  Selected Works
                </h2>
              </div>

              {/* Asymmetric grid — desktop cascade, mobile stack */}
              {featured.length > 0 && (
                <div
                  className="
                    grid grid-cols-1 gap-4
                    lg:grid-cols-3 lg:gap-8
                    lg:items-start
                  "
                >
                  {featured.map((product, i) => {
                    const marginTops = ['0px', '48px', '96px']
                    return (
                      <div
                        key={product.id}
                        data-animate="fade-up"
                        style={{
                          marginTop: i > 0 ? marginTops[i] : undefined,
                          transitionDelay: `${i * 120}ms`,
                        }}
                      >
                        <ProductCard product={product} priority={i === 0} />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* See all link */}
              <div className="mt-20 flex justify-center">
                <Link
                  href="/catalog"
                  className="
                    inline-block
                    font-body font-normal text-obsidian uppercase
                    border-b border-obsidian
                    pb-px
                    hover:opacity-60
                    transition-opacity duration-300
                  "
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                  }}
                >
                  See all pieces →
                </Link>
              </div>

            </Container>
          </section>
        </AnimateOnScroll>


        {/* ════════════════════════════════════════════
            SECTION 3 — Brand Statement
            Full-width linen band. Italic Cormorant pull quote.
        ════════════════════════════════════════════ */}
        <AnimateOnScroll>
          <section
            aria-label="Brand philosophy"
            className="bg-linen"
            style={{
              paddingTop: '120px',
              paddingBottom: '120px',
            }}
          >
            <div
              className="
                mx-auto px-6 md:px-8
                flex flex-col items-center text-center
              "
              style={{ maxWidth: '680px' }}
            >
              <blockquote
                data-animate="fade-up"
                className="font-display font-normal italic text-obsidian"
                style={{
                  fontSize: '26px',
                  lineHeight: '1.5',
                }}
              >
                Leather is a living material. It marks time, absorbs habit,
                tells the story of its use. We make objects that are meant to
                age — that look better at forty years than at four days.
              </blockquote>

              <p
                data-animate="fade-up"
                className="font-body font-light text-stone mt-8"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  transitionDelay: '160ms',
                }}
              >
                — Fjordleather, Oslo
              </p>
            </div>
          </section>
        </AnimateOnScroll>


        {/* ════════════════════════════════════════════
            SECTION 4 — Material callout strip
            3-column. No background. Border-top dividers.
        ════════════════════════════════════════════ */}
        <section
          aria-label="Materials and construction"
          className="bg-chalk"
          style={{ paddingTop: 'var(--space-5xl)', paddingBottom: 'var(--space-5xl)' }}
        >
          <Container>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">

              {/* Column 1 */}
              <div
                className="border-t border-stone pt-6"
              >
                <p
                  className="font-body font-medium uppercase text-cognac mb-2"
                  style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                >
                  Full-Grain Italian Leather
                </p>
                <p
                  className="font-body font-light text-stone"
                  style={{ fontSize: '14px', lineHeight: '1.6' }}
                >
                  Vegetable-tanned at Badalassi Carlo
                </p>
              </div>

              {/* Column 2 */}
              <div
                className="border-t border-stone pt-6"
              >
                <p
                  className="font-body font-medium uppercase text-cognac mb-2"
                  style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                >
                  Hand-Stitched
                </p>
                <p
                  className="font-body font-light text-stone"
                  style={{ fontSize: '14px', lineHeight: '1.6' }}
                >
                  Waxed linen thread throughout
                </p>
              </div>

              {/* Column 3 */}
              <div
                className="border-t border-stone pt-6"
              >
                <p
                  className="font-body font-medium uppercase text-cognac mb-2"
                  style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                >
                  Brass Hardware
                </p>
                <p
                  className="font-body font-light text-stone"
                  style={{ fontSize: '14px', lineHeight: '1.6' }}
                >
                  Aged and unlacquered
                </p>
              </div>

            </div>
          </Container>
        </section>

      </main>

      <Footer />
    </>
  )
}
