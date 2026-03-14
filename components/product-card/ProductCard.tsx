'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/data/types'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const {
    slug,
    name,
    category,
    price,
    currency,
    images,
  } = product

  const primaryImage = images[0]
  const categoryLabel = category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div
      data-animate="fade-up"
      className="group cursor-pointer"
    >
      <Link
        href={`/products/${slug}`}
        aria-label={`${name} — ${formatPrice(price, currency)}`}
        className="block focus-visible:outline-2 focus-visible:outline-cognac focus-visible:outline-offset-2"
      >
        {/* ── Image container ───────────────────── */}
        <div
          className={cn('relative aspect-[4/5] overflow-hidden', category !== 'wallets' && 'bg-linen')}
          style={category === 'wallets' ? { background: 'linear-gradient(to bottom right, #2A1A10, #1A0E08)' } : undefined}
        >

          {/* Product image — object-contain so the full product is visible
              with breathing room, not cropped edge-to-edge */}
          {primaryImage ? (
            <div
              className="absolute inset-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: 'scale(1.0)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
            >
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain"
                priority={priority || primaryImage.priority}
              />
            </div>
          ) : (
            // Placeholder when no image is available
            <div className={cn('absolute inset-0', category !== 'wallets' && 'bg-linen')} aria-hidden="true" />
          )}

          {/* FJORDLEATHER branding overlay — rendered after image so it sits on top */}
          {category === 'wallets' && (
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-0 right-0 text-center font-body pointer-events-none"
              style={{ fontSize: '14px', letterSpacing: '2.5px', color: '#C4B5A8', opacity: 0.4, zIndex: 10 }}
            >
              FJORDLEATHER
            </span>
          )}
        </div>

        {/* ── Text content ──────────────────────── */}
        <div className="pt-5">

          {/* Row 1: Category overline */}
          <p className="text-style-overline text-stone">
            {categoryLabel}
          </p>

          {/* Row 2 & 3: Name + price in a flex row */}
          <div className="flex items-baseline justify-between gap-4 mt-1">
            <h3
              className={cn(
                'font-display font-normal text-[22px] leading-tight text-obsidian',
                'flex-1 min-w-0',
              )}
            >
              {name}
            </h3>

            <span
              className="font-body font-light text-[16px] text-obsidian shrink-0 whitespace-nowrap"
              aria-label={`Price: ${formatPrice(price, currency)}`}
            >
              {formatPrice(price, currency)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
