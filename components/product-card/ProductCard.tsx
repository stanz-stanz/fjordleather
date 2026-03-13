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
    isNew,
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
        <div className="relative aspect-product overflow-hidden bg-linen">

          {/* "New" badge */}
          {isNew && (
            <span
              aria-label="New arrival"
              className={cn(
                'absolute top-4 left-4 z-[10]',
                'font-body font-medium text-[9px] uppercase tracking-[0.12em]',
                'text-chalk bg-cognac',
                'px-2 py-1',
                // No border-radius — brand signature sharp edge
              )}
            >
              New
            </span>
          )}

          {/* Product image */}
          {primaryImage ? (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                'object-cover',
                // Scale on card hover — slow and deliberate
                'transition-transform duration-500',
                'group-hover:scale-[1.03]',
                '[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
              )}
              priority={priority || primaryImage.priority}
            />
          ) : (
            // Placeholder when no image is available
            <div className="absolute inset-0 bg-linen" aria-hidden="true" />
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
