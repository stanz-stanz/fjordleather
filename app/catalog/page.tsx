'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Container from '@/components/common/Container'
import ProductCard from '@/components/product-card/ProductCard'
import AnimateOnScroll from '@/components/common/AnimateOnScroll'
import { getAllProducts } from '@/data/utils'
import { categories } from '@/data/categories'
import type { ProductCategory } from '@/data/types'

type FilterValue = 'all' | ProductCategory

const ALL_FILTER: FilterValue = 'all'

export default function CatalogPage() {
  const allProducts = getAllProducts()
  const [activeCategory, setActiveCategory] = useState<FilterValue>(ALL_FILTER)

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_FILTER) return allProducts
    return allProducts.filter((p) => p.category === activeCategory)
  }, [allProducts, activeCategory])

  const filterOptions: Array<{ value: FilterValue; label: string }> = [
    { value: ALL_FILTER, label: 'All' },
    ...categories.map((c) => ({ value: c.id as FilterValue, label: c.label })),
  ]

  return (
    <>
      <main id="main-content" className="bg-chalk">

        {/* ══════════════════════════════════════
            Page header — above filter bar
        ══════════════════════════════════════ */}
        <Container
          as="div"
          className="pt-[128px] pb-10"
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8"
          >
            <ol className="flex items-center gap-0">
              <li>
                <Link
                  href="/"
                  className="
                    font-body font-light text-stone
                    hover:text-obsidian transition-colors duration-150
                  "
                  style={{ fontSize: '12px' }}
                >
                  Homepage
                </Link>
              </li>
              <li
                className="font-body font-light text-stone mx-2"
                style={{ fontSize: '12px' }}
                aria-hidden="true"
              >
                /
              </li>
              <li
                className="font-body font-light text-obsidian"
                style={{ fontSize: '12px' }}
                aria-current="page"
              >
                Collection
              </li>
            </ol>
          </nav>

          {/* Heading block */}
          <div className="max-w-[560px]">
            <p className="text-style-overline text-stone mb-4">
              Our Catalog
            </p>
            <h1 className="text-style-display text-obsidian mb-4">
              The Collection
            </h1>
            <p
              className="font-body font-light text-obsidian"
              style={{ fontSize: '16px', lineHeight: '1.65' }}
            >
              Handmade in limited quantities. Full-grain leather throughout.
            </p>
          </div>
        </Container>

        {/* ══════════════════════════════════════
            Sticky filter bar
        ══════════════════════════════════════ */}
        <div
          className="sticky top-[64px] bg-chalk border-b border-stone/30"
          style={{ zIndex: 'var(--z-sticky)' }}
        >
          <Container as="div">
            <div
              className="
                flex items-center gap-0
                overflow-x-auto scrollbar-hide
                -mx-4 px-4 md:mx-0 md:px-0
              "
              role="tablist"
              aria-label="Filter by category"
            >
              {filterOptions.map(({ value, label }) => {
                const isActive = activeCategory === value
                return (
                  <button
                    key={value}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(value)}
                    className="
                      flex-shrink-0
                      font-body font-medium uppercase
                      transition-colors duration-200
                      whitespace-nowrap
                    "
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      padding: '18px 20px',
                      backgroundColor: isActive
                        ? 'var(--color-obsidian)'
                        : 'transparent',
                      color: isActive
                        ? 'var(--color-chalk)'
                        : 'var(--color-stone)',
                      borderRadius: 0,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--color-obsidian)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--color-stone)'
                      }
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </Container>
        </div>

        {/* ══════════════════════════════════════
            Product grid
        ══════════════════════════════════════ */}
        <Container
          as="div"
          className="py-16"
        >

          {/* Product count */}
          <p
            className="font-body font-light text-stone mb-10"
            style={{ fontSize: '13px' }}
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>

          {/* Grid or empty state */}
          {filteredProducts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center text-center"
              style={{ paddingTop: '80px', paddingBottom: '80px' }}
            >
              <p
                className="font-display font-light italic text-stone"
                style={{ fontSize: '22px', marginBottom: '12px' }}
              >
                No pieces in this category yet.
              </p>
              <p
                className="font-body font-light text-stone/60"
                style={{ fontSize: '14px' }}
              >
                Check back soon, or browse the full collection.
              </p>
              <button
                onClick={() => setActiveCategory(ALL_FILTER)}
                className="
                  mt-8
                  font-body font-normal text-obsidian uppercase
                  border-b border-obsidian
                  pb-px
                  hover:opacity-60
                  transition-opacity duration-300
                  bg-transparent cursor-pointer
                "
                style={{ fontSize: '12px', letterSpacing: '0.1em' }}
              >
                View all pieces →
              </button>
            </div>
          ) : (
            <AnimateOnScroll>
              <div
                className="
                  grid
                  grid-cols-1 gap-4
                  sm:grid-cols-2 sm:gap-6
                  lg:grid-cols-3 lg:gap-8
                "
              >
                {filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    data-animate="fade-up"
                    style={{ transitionDelay: `${(i % 9) * 80}ms` }}
                  >
                    <ProductCard product={product} priority={i < 3} />
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          )}

        </Container>

      </main>
    </>
  )
}
