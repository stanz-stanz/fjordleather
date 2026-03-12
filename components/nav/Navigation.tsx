'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { BRAND_NAME, NAV_LINKS } from '@/lib/constants'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll listener — background and border appear after 1px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close drawer when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* ── Skip to content ─────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-chalk focus:text-obsidian focus:px-4 focus:py-2 focus:text-label"
      >
        Skip to content
      </a>

      {/* ── Navigation bar ──────────────────────── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[30] h-[72px]',
          'transition-[background-color,border-color,backdrop-filter]',
          'duration-300',
          scrolled
            ? 'bg-chalk border-b border-[rgba(196,181,168,0.4)] backdrop-blur-[12px]'
            : 'bg-transparent border-b border-transparent',
        )}
        style={{ '--tw-ease': 'cubic-bezier(0.76, 0, 0.24, 1)' } as React.CSSProperties}
      >
        <div className="container-fiord h-full flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">

          {/* Logo */}
          <Link
            href="/"
            className="font-display font-normal text-[20px] tracking-wider text-obsidian whitespace-nowrap"
            aria-label={`${BRAND_NAME} — return to homepage`}
          >
            {BRAND_NAME}
          </Link>

          {/* Desktop nav links — centered */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <NavLink key={link.href} href={link.href} active={isActive}>
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          {/* Right slot (desktop spacer + mobile hamburger) */}
          <div className="flex items-center justify-end">
            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] text-obsidian"
            >
              <span className="block w-6 h-px bg-obsidian" />
              <span className="block w-6 h-px bg-obsidian" />
              <span className="block w-6 h-px bg-obsidian" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay backdrop ──────────────── */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[40] bg-obsidian/40 lg:hidden"
          style={{ backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* ── Mobile drawer ───────────────────────── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[100] w-[85vw] max-w-[400px]',
          'bg-espresso flex flex-col',
          'transition-transform duration-[800ms]',
          'lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Close button */}
        <div className="flex justify-end pt-5 pr-6">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="text-chalk text-[32px] leading-none w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity duration-150"
          >
            ×
          </button>
        </div>

        {/* Drawer links */}
        <nav
          aria-label="Main navigation"
          className="flex flex-col px-8 pt-8 gap-8"
        >
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-display italic font-normal text-[32px] leading-tight text-chalk',
                  'transition-opacity duration-300',
                  isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100',
                )}
                style={{
                  animationDelay: mobileOpen ? `${i * 75}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom contact hint */}
        <div className="mt-auto px-8 pb-12">
          <p className="font-body font-light text-[13px] text-stone/60 tracking-wide">
            hello@fjordleather.com
          </p>
        </div>
      </div>
    </>
  )
}

/* ── Desktop nav link with underline animation ── */

interface NavLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'relative font-body font-medium text-[11px] uppercase tracking-[0.15em]',
        'pb-[3px]',
        'transition-colors duration-300',
        // Underline pseudo-element via after: — scales in from left on hover
        'after:content-[""] after:absolute after:bottom-0 after:left-0',
        'after:h-px after:w-full after:bg-obsidian',
        'after:transition-transform after:duration-300',
        'after:[transition-timing-function:cubic-bezier(0.76,0,0.24,1)]',
        'after:origin-left',
        active
          ? 'text-obsidian after:scale-x-100'
          : 'text-stone hover:text-obsidian after:scale-x-0 hover:after:scale-x-100',
      )}
    >
      {children}
    </Link>
  )
}
