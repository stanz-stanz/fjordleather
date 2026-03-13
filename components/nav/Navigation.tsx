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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-chalk focus:text-obsidian focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[30] h-[64px]',
          'transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled
            ? 'bg-chalk/95 border-b border-stone/20 backdrop-blur-[8px]'
            : 'bg-chalk border-b border-stone/20',
        )}
      >
        <div className="container-fiord h-full flex items-center justify-between">

          <Link
            href="/"
            className="font-display font-normal text-[18px] tracking-[0.08em] text-obsidian whitespace-nowrap"
            aria-label={`${BRAND_NAME} — return to homepage`}
          >
            {BRAND_NAME}
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-body text-[12px] uppercase tracking-[0.12em] transition-colors duration-200',
                    isActive ? 'text-obsidian' : 'text-stone hover:text-obsidian',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          >
            <span className="block w-5 h-px bg-obsidian" />
            <span className="block w-5 h-px bg-obsidian" />
            <span className="block w-5 h-px bg-obsidian" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[40] bg-obsidian/30 lg:hidden"
        />
      )}

      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[100] w-[80vw] max-w-[360px]',
          'bg-chalk flex flex-col border-l border-stone/20',
          'transition-transform duration-700',
          'lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex justify-end pt-5 pr-6">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="text-obsidian text-[28px] leading-none w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex flex-col px-8 pt-6 gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-display font-normal text-[28px] leading-tight',
                  isActive ? 'text-obsidian' : 'text-obsidian/60 hover:text-obsidian',
                  'transition-colors duration-200',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto px-8 pb-10 border-t border-stone/20 pt-6">
          <p className="font-body font-light text-[13px] text-stone tracking-wide">
            hello@fjordleather.com
          </p>
        </div>
      </div>
    </>
  )
}
