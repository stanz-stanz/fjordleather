import Link from 'next/link'
import { BRAND_NAME } from '@/lib/constants'

export default function SiteHeader() {
  return (
    <div style={{ backgroundColor: '#FEEBCF', marginBottom: '-48px' }}>
      <Link href="/" aria-label={`${BRAND_NAME} — return to homepage`} style={{ display: 'block' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Fjordleather — Crafted by Hand"
          style={{ display: 'block', marginLeft: '1%', width: '80%', maxWidth: '1085px', height: 'auto' }}
        />
      </Link>
      {/* Gradient below the image — blends into nav without covering the logo */}
      <div aria-hidden="true" style={{
        height: '48px',
        background: 'linear-gradient(to bottom, #FEEBCF, rgba(254,235,207,0.6) 60%, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
