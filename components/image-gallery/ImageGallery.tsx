'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/data/types'

interface ImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Guard against empty array
  const safeImages = images.length > 0 ? images : []
  const activeImage = safeImages[activeIndex]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1))
    }
  }

  if (safeImages.length === 0) {
    return (
      <div className="relative aspect-[3/2.6] w-full bg-linen" aria-label={productName} />
    )
  }

  return (
    <div className="w-full">
      {/* ── Primary image ─────────────────────── */}
      <div
        role="region"
        aria-label={`${productName} gallery — use arrow keys to navigate images`}
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative aspect-[3/2.6] w-full overflow-hidden bg-linen focus-visible:outline-2 focus-visible:outline-cognac focus-visible:outline-offset-2"
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeIndex}
            src={activeImage.src}
            alt={activeImage.alt}
            className="animate-fade-in"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            aria-label={`${productName}, image ${activeIndex + 1} of ${safeImages.length}`}
          />
        </div>
      </div>

      {/* ── Thumbnail strip ───────────────────── */}
      {safeImages.length > 1 && (
        <div
          role="tablist"
          aria-label="Product image thumbnails"
          className={cn(
            'flex flex-row gap-2 mt-3',
            // Horizontal scroll on mobile
            'overflow-x-auto',
            // Hide scrollbar visually while keeping functionality
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            '-webkit-overflow-scrolling-touch',
          )}
        >
          {safeImages.map((image, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View image ${i + 1} of ${safeImages.length}${image.alt ? `: ${image.alt}` : ''}`}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'relative shrink-0 w-[72px] h-[72px] overflow-hidden bg-linen',
                  'cursor-pointer focus-visible:outline-2 focus-visible:outline-cognac focus-visible:outline-offset-2',
                  'transition-opacity duration-300',
                  isActive
                    ? 'ring-1 ring-obsidian opacity-100'
                    : 'opacity-50 hover:opacity-100',
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="72px"
                  className="object-contain p-1"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
