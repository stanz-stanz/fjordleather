import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Craft — Fjordleather',
  description: 'How we make our leather goods, and why it matters.',
};

/* ── Process steps ─────────────────────────────────────────────── */

const processSteps = [
  { number: '01', name: 'Selection' },
  { number: '02', name: 'Cutting' },
  { number: '03', name: 'Stitching' },
  { number: '04', name: 'Finishing' },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main id="main-content">

      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — Opening
          Full viewport, chalk, pure typography
      ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Brand statement"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-chalk)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '96px',
          paddingBottom: '96px',
          paddingInline: 'var(--space-md)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '720px',
          }}
          className="animate-fade-up"
        >
          {/* Overline */}
          <p
            className="text-style-overline"
            style={{
              color: 'var(--color-stone)',
              marginBottom: '40px',
            }}
          >
            Est. Oslo, Norway
          </p>

          {/* Main statement */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-obsidian)',
              margin: 0,
            }}
          >
            Made by hand.
            <br />
            Finished by time.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'var(--color-obsidian)',
              maxWidth: '480px',
              margin: '32px auto 0',
            }}
          >
            We make leather goods the way they&apos;ve always been made — slowly,
            by hand, with materials that improve with age.
          </p>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — The Process
          Linen background, two-column: steps list + prose
      ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Our process"
        style={{
          backgroundColor: 'var(--color-linen)',
          paddingTop: '120px',
          paddingBottom: '120px',
        }}
      >
        <div className="container-fiord">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '64px',
              alignItems: 'start',
            }}
            className="lg:grid-cols-[2fr_3fr]"
          >
            {/* LEFT: process steps */}
            <div>
              <p
                className="text-style-overline"
                style={{ color: 'var(--color-stone)', marginBottom: '40px' }}
              >
                How it&apos;s made
              </p>

              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {processSteps.map((step, i) => (
                  <li
                    key={step.number}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '20px',
                      padding: '24px 0',
                      borderBottom:
                        i < processSteps.length - 1
                          ? '1px solid var(--color-stone)'
                          : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        color: 'var(--color-stone)',
                        flexShrink: 0,
                        width: '28px',
                      }}
                    >
                      {step.number}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--color-obsidian)',
                      }}
                    >
                      {step.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* RIGHT: long-form prose */}
            <div>
              <p
                className="text-style-overline"
                style={{ color: 'var(--color-stone)', marginBottom: '40px' }}
              >
                The detail behind the work
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '28px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--color-obsidian)',
                    margin: 0,
                  }}
                >
                  Every piece begins at the source. We work exclusively with
                  vegetable-tanned full-grain leather from two historic Tuscan
                  tanneries — Badalassi Carlo in Prato and Conceria Walpier in
                  Florence. Both tan their hides in open oak-bark pits, a process
                  unchanged since the medieval guilds. We visit twice a year to
                  select hides by hand, choosing for grain consistency, density, and
                  the specific character that tells us a piece will age gracefully.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--color-obsidian)',
                    margin: 0,
                  }}
                >
                  Pattern-making is done on paper first, then transferred to
                  thick acrylic templates worn smooth with use. Every cut is made
                  with a paring knife along a steel rule — no die-cutting, no
                  punching. The natural edge of each panel is skived by hand to
                  reduce bulk at the seams, a step that requires years of practice
                  to do without feathering the grain.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--color-obsidian)',
                    margin: 0,
                  }}
                >
                  All stitching is done using the saddle stitch technique: two
                  needles, a single thread, each stitch locked from both sides
                  simultaneously. The thread is waxed linen — 0.8mm, tightly
                  twisted, saturated in beeswax. Holes are pricked with a diamond
                  awl at precisely 3.5mm spacing. The result is a stitch that
                  cannot unravel: if one segment breaks, the rest holds.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--color-obsidian)',
                    margin: 0,
                  }}
                >
                  The final stage is finishing. Edges are bevelled with a hand
                  tool, dampened, burnished with a bone folder against a slicker
                  until the fibres lay flat and the edge takes on a semi-gloss.
                  Hardware is set by hand, never heat-staked. The exterior surface
                  receives one coat of natural wax, buffed in. Nothing more. The
                  leather should arrive to you ready to begin its own story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — Materials
          Chalk background, two-column: text + image placeholder
      ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Materials"
        style={{
          backgroundColor: 'var(--color-chalk)',
          paddingTop: '120px',
          paddingBottom: '120px',
        }}
      >
        <div className="container-fiord">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="lg:grid-cols-2"
          >
            {/* LEFT: text */}
            <div>
              <p
                className="text-style-overline"
                style={{ color: 'var(--color-stone)', marginBottom: '24px' }}
              >
                The leather
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-obsidian)',
                  margin: '0 0 24px',
                }}
              >
                Italian Full-Grain Leather
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: 'var(--color-obsidian)',
                  margin: '0 0 16px',
                  maxWidth: '480px',
                }}
              >
                Full-grain leather is the outermost layer of the hide — the
                surface that bears the animal&apos;s own grain pattern, scars, and
                texture. It is never sanded, corrected, or coated to hide
                imperfections. This integrity is precisely what makes it superior:
                the tight, intact fibre structure repels moisture, resists abrasion,
                and develops a rich patina over decades of use. Lesser leathers
                are sanded smooth and pigmented to look uniform. Full-grain
                looks different from the start, and better with every passing year.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: 'var(--color-obsidian)',
                  margin: '0 0 28px',
                  maxWidth: '480px',
                }}
              >
                Italian vegetable tanning — as opposed to the chrome-tanning
                used for the majority of the world&apos;s leather — uses plant-derived
                tannins that require months rather than hours. The result is a
                firmer, more structured hide that holds shape, takes tooling, and
                responds to conditioning oil in a way no chrome-tanned leather can.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.5,
                  color: 'var(--color-stone)',
                  margin: 0,
                }}
              >
                Sourced from Badalassi Carlo, Prato
              </p>
            </div>

            {/* RIGHT: image placeholder */}
            <div
              style={{
                backgroundColor: 'var(--color-linen)',
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '15px',
                  color: 'var(--color-stone)',
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                [Leather texture]
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — Maker's Statement
          Espresso background, centered blockquote
      ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Maker's statement"
        style={{
          backgroundColor: 'var(--color-espresso)',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        <div className="container-fiord">
          <div
            style={{
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '26px',
                lineHeight: 1.55,
                color: 'var(--color-chalk)',
                margin: '0 0 32px',
                padding: 0,
                border: 'none',
              }}
            >
              &ldquo;We don&apos;t make products. We make companions — objects that
              absorb the oils of your hands, that crease in the places you grip
              them most, that carry the evidence of where you&apos;ve been. A bag
              shouldn&apos;t look new at thirty years. It should look honest.&rdquo;
            </blockquote>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '12px',
                letterSpacing: '0.08em',
                color: 'var(--color-stone)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              — The Maker
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
