import Link from 'next/link'
import { BRAND_NAME, CONTACT_EMAIL, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-espresso">
      {/* ── Main content ─────────────────────────── */}
      <div className="container-fiord pt-20 pb-12 md:pt-[80px] md:pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">

          {/* Left — Brand identity */}
          <div>
            <p
              className="font-display font-light italic text-[24px] leading-tight text-chalk"
              aria-label={BRAND_NAME}
            >
              {BRAND_NAME}
            </p>
            <p className="mt-4 font-body font-light text-[13px] leading-relaxed text-stone">
              Made by hand. Finished by time.
            </p>
          </div>

          {/* Center — Navigation links */}
          <div>
            <p className="text-style-overline text-stone mb-5">
              Collection
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body font-light text-[14px] text-chalk transition-opacity duration-300 hover:opacity-60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right — Contact */}
          <div>
            <p className="text-style-overline text-stone mb-5">
              Inquiries
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body font-light text-[14px] text-chalk transition-colors duration-300 hover:underline underline-offset-4 decoration-stone/60"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-4 font-body font-light text-[13px] text-stone/60 leading-relaxed">
              We respond within two business days.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────── */}
      <div className="border-t border-stone/20">
        <div className="container-fiord py-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body font-light text-[12px] text-stone">
            &copy; 2026 {BRAND_NAME}. All rights reserved.
          </p>
          <p className="font-body font-light text-[12px] text-stone/60 sm:text-right">
            Full-grain Italian leather.
          </p>
        </div>
      </div>
    </footer>
  )
}
