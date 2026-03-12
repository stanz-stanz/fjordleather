'use client'

import { useEffect, useRef } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wraps children and attaches an IntersectionObserver to all
 * child elements that carry `data-animate="fade-up"`.
 * When an element enters the viewport the `is-visible` class is
 * added, which triggers the CSS transition defined in globals.css.
 */
export default function AnimateOnScroll({
  children,
  className,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>('[data-animate="fade-up"]')
    )

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Fire once only
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
