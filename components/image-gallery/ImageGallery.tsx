'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
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

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [safeImages.length])

  if (safeImages.length === 0) {
    return (
      <div className="relative aspect-product w-full max-w-[600px] bg-linen" aria-label={productName} />
    )
  }

  return (
    <div className="w-full max-w-[600px]">
      {/* ── Primary image ─────────────────────── */}
      <div
        role="region"
        aria-label={`${productName} — product images`}
        aria-roledescription="Image gallery"
        className="relative aspect-product w-full overflow-hidden bg-linen"
      >
        <Image
          key={activeIndex}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover animate-fade-in"
          priority={activeIndex === 0 && (activeImage.priority ?? false)}
          aria-label={`${productName}, image ${activeIndex + 1} of ${safeImages.length}`}
        />
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
                  'relative shrink-0 w-[72px] h-[72px] overflow-hidden',
                  'cursor-pointer focus-visible:outline-2 focus-visible:outline-fjord focus-visible:outline-offset-2',
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
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
