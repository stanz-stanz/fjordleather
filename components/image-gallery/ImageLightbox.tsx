'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ProductImage } from '@/data/types'

const FOCUSABLE = [
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

interface ImageLightboxProps {
  images: ProductImage[]
  productName: string
  initialIndex: number
  onClose: () => void
}

export default function ImageLightbox({
  images,
  productName,
  initialIndex,
  onClose,
}: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isClosing, setIsClosing] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const didScroll = useRef(false)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const startClose = () => {
    if (reducedMotion) {
      onClose()
      return
    }
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(images.length - 1, i + 1))

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Focus close button on open
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Center scroll position when image changes (no-op on desktop where overflow is hidden)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    el.scrollTop = 0
  }, [activeIndex])

  // Keyboard: Escape, arrows, Tab trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { startClose(); return }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); return }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); return }
      if (e.key !== 'Tab') return
      const overlay = overlayRef.current
      if (!overlay) return
      const focusable = Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, reducedMotion])

  const activeImage = images[activeIndex]
  const atFirst = activeIndex === 0
  const atLast = activeIndex === images.length - 1

  const arrowStyle = (side: 'left' | 'right', disabled: boolean): React.CSSProperties => ({
    position: 'absolute',
    [side]: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    background: 'none',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    color: disabled ? 'rgba(250,249,247,0.2)' : 'rgba(250,249,247,0.6)',
    fontSize: 40,
    lineHeight: 1,
    fontFamily: 'var(--font-body)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `color var(--duration-gentle) var(--ease-in-out)`,
    pointerEvents: disabled ? 'none' : 'auto',
  })

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen product image viewer"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)' as unknown as number,
        background: 'rgba(30,22,15,0.95)',
        display: 'flex',
        animation: isClosing || reducedMotion
          ? undefined
          : 'fade-in var(--duration-slow) var(--ease-out) both',
        opacity: isClosing ? 0 : undefined,
        transition: isClosing && !reducedMotion
          ? `opacity var(--duration-gentle) var(--ease-in-out)`
          : undefined,
      }}
    >
      {/* Scrollable image area — on mobile becomes a pannable region */}
      <div
        ref={scrollRef}
        className="lightbox-scroll"
        onTouchStart={() => { didScroll.current = false }}
        onTouchMove={() => { didScroll.current = true }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !didScroll.current) startClose()
          didScroll.current = false
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={activeIndex}
          src={activeImage.src}
          alt={activeImage.alt}
          className={reducedMotion ? 'lightbox-img' : 'animate-scale-in lightbox-img'}
        />
      </div>

      {/* Controls layer — absolutely positioned, never scrolls */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>

        {/* Close */}
        <button
          ref={closeRef}
          type="button"
          aria-label="Close fullscreen view"
          onClick={startClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 44,
            height: 44,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(250,249,247,0.6)',
            fontSize: 32,
            lineHeight: 1,
            fontFamily: 'var(--font-body)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `color var(--duration-gentle) var(--ease-in-out)`,
            pointerEvents: 'auto',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(250,249,247,1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,249,247,0.6)')}
        >
          ×
        </button>

        {/* Prev arrow — always rendered; dimmed + inert at first image */}
        <button
          type="button"
          aria-label="Previous image"
          aria-disabled={atFirst}
          onClick={atFirst ? undefined : prev}
          style={arrowStyle('left', atFirst)}
          onMouseEnter={(e) => {
            if (!atFirst) e.currentTarget.style.color = 'rgba(250,249,247,1)'
          }}
          onMouseLeave={(e) => {
            if (!atFirst) e.currentTarget.style.color = 'rgba(250,249,247,0.6)'
          }}
        >
          ‹
        </button>

        {/* Next arrow — always rendered; dimmed + inert at last image */}
        <button
          type="button"
          aria-label="Next image"
          aria-disabled={atLast}
          onClick={atLast ? undefined : next}
          style={arrowStyle('right', atLast)}
          onMouseEnter={(e) => {
            if (!atLast) e.currentTarget.style.color = 'rgba(250,249,247,1)'
          }}
          onMouseLeave={(e) => {
            if (!atLast) e.currentTarget.style.color = 'rgba(250,249,247,0.6)'
          }}
        >
          ›
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <p
            aria-live="polite"
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(250,249,247,0.7)',
              fontSize: 13,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.08em',
              margin: 0,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {activeIndex + 1} / {images.length}
          </p>
        )}

        {/* Pan hint — mobile only, fades in then out to signal the image can be dragged */}
        <span className="lightbox-pan-hint" aria-hidden="true">
          drag to explore
        </span>

      </div>
    </div>,
    document.body,
  )
}
