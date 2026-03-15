import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Craft — Fjordleather',
  description: 'How we make our leather goods, and why it matters.',
};

/* ── Process steps ─────────────────────────────────────────────── */

const processSteps = [
  {
    number: '01',
    name: 'Selection',
    body: 'Every piece begins at the source. We work exclusively with vegetable-tanned full-grain leather from Tuscan tanneries. Both tan their hides in open oak-bark pits, a process unchanged since the medieval guilds.',
  },
  {
    number: '02',
    name: 'Cutting',
    body: 'Pattern-making is done on paper first, then transferred to the leather previously nourished. Every cut is made with a paring knife along a steel rule — no die-cutting, no punching. The natural edge of each panel is skived by hand to reduce bulk at the seams, without feathering the grain.',
  },
  {
    number: '03',
    name: 'Stitching',
    body: 'All stitching is done using the saddle stitch technique: two needles, a single thread, each stitch locked from both sides simultaneously. The thread is waxed nylon/polyester — 0.5mm, tightly twisted, saturated in beeswax. The result is a stitch that cannot unravel: if one segment breaks, the rest holds.',
  },
  {
    number: '04',
    name: 'Finishing',
    body: 'The final stage is finishing. Edges are bevelled with a hand tool, dampened, burnished with a bone folder against a slicker until the fibres lay flat and the edge takes on a semi-gloss. Hardware is set by hand, never heat-staked. The exterior surface receives one coat of natural wax, buffed in. Nothing more. The leather should arrive to you ready to begin its own story.',
  },
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
          minHeight: '40vh',
          backgroundColor: '#DED0B6',
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
            Est. Vejle, Denmark
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
          Linen background, vertical editorial chapters
      ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Our process"
        style={{
          backgroundColor: 'var(--color-linen)',

          paddingBottom: '120px',
        }}
      >
        <div className="container-fiord">
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {processSteps.map((step, i) => (
              <li
                key={step.number}
                style={{
                  borderTop: '1px solid var(--color-stone)',
                  paddingTop: '36px',
                  paddingBottom: i < processSteps.length - 1 ? '36px' : 0,
                }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: "32px",
                  lineHeight: 1.25,
                  color: 'var(--color-obsidian)',
                  margin: '0 0 24px',
                }}>
                  {step.name}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: "18px",
                  lineHeight: 1.65,
                  color: 'var(--color-obsidian)',
                  maxWidth: '560px',
                  margin: 0,
                }}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

        </div>
      </section>



{/* ════════════════════════════════════════════════════════════
          SECTION 4 — Maker's Statement
          Espresso background, centered blockquote
      ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Maker's statement"
        style={{
          backgroundColor: '#DED0B6',
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
                color: 'var(--color-obsidian)',
                margin: '0 0 32px',
                padding: 0,
                border: 'none',
              }}
            >
              We don&apos;t make just products. 
              We make companions — objects that
              absorb the oils of your hands, that crease in the places you grip
              them most, that carry the evidence of where you&apos;ve been. A bag
              shouldn&apos;t look new at thirty years. It should look honest.
            </blockquote>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '15px',
                letterSpacing: '0.08em',
                color: 'var(--color-stone)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
