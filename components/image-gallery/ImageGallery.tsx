'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/data/types'
import ImageLightbox from './ImageLightbox'

interface ImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const zoomBtnRef = useRef<HTMLButtonElement>(null)

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
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-[3/2.6] w-full overflow-hidden bg-linen focus-visible:outline-2 focus-visible:outline-cognac focus-visible:outline-offset-2 cursor-pointer"
      >
        <div className="absolute inset-0 p-6">
          <div className="relative w-full h-full">
            <Image
              key={activeIndex}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px"
              className="animate-fade-in object-contain"
              aria-label={`${productName}, image ${activeIndex + 1} of ${safeImages.length}`}
            />
          </div>
        </div>
        {/* Zoom trigger */}
        <button
          ref={zoomBtnRef}
          type="button"
          aria-label="View fullscreen image"
          onClick={() => setLightboxOpen(true)}
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: 40,
            height: 40,
            background: 'rgba(254,235,207,0.85)',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--duration-gentle) var(--ease-in-out)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(254,235,207,1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(254,235,207,0.85)')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            stroke="#0F0D0C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="13,2 18,2 18,7" />
            <polyline points="7,18 2,18 2,13" />
            <line x1="18" y1="2" x2="12" y2="8" />
            <line x1="2" y1="18" x2="8" y2="12" />
          </svg>
        </button>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={safeImages}
          productName={productName}
          initialIndex={activeIndex}
          onClose={() => {
            setLightboxOpen(false)
            zoomBtnRef.current?.focus()
          }}
        />
      )}

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
