'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

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

  // Focus first element in drawer when it opens; return focus to hamburger on close
  useEffect(() => {
    if (mobileOpen) {
      const first = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]
      first?.focus()
    } else {
      hamburgerRef.current?.focus()
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const drawer = drawerRef.current
      if (!drawer) return
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

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
          'sticky top-0 left-0 right-0 z-[30] h-[56px]',
          'transition-[background-color,border-color,backdrop-filter] duration-300',
          '[background-color:#0F0D0C]',
          scrolled
            ? 'border-b border-stone/20 backdrop-blur-[8px]'
            : 'border-b border-transparent',
        )}
      >
        <div className="container-fiord h-full flex items-center justify-end">

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body font-normal text-[14px] uppercase tracking-[0.14em] transition-colors duration-200"
                  style={{ color: '#FAF9F7' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            ref={hamburgerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          >
            <span className="block w-5 h-px bg-chalk" />
            <span className="block w-5 h-px bg-chalk" />
            <span className="block w-5 h-px bg-chalk" />
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
        ref={drawerRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[100] w-[80vw] max-w-[360px]',
          'bg-obsidian flex flex-col border-l border-stone/20',
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
            className="text-[28px] leading-none w-10 h-10 flex items-center justify-center transition-opacity"
            style={{ color: '#FAF9F7', opacity: 0.6 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          >
            x
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex flex-col px-8 pt-6 gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-display font-normal text-[28px] leading-tight transition-colors duration-200"
                style={{ color: isActive ? '#FAF9F7' : 'rgba(250,249,247,0.6)' }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto px-8 pb-10 border-t border-stone/20 pt-6">
          <p className="font-body font-light text-[13px] tracking-wide" style={{ color: '#C4B5A8' }}>
            hello@fjordleather.com
          </p>
        </div>
      </div>
    </>
  )
}
