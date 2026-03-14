import Link from 'next/link'
import { BRAND_NAME } from '@/lib/constants'

export default function SiteHeader() {
  return (
    <div style={{ backgroundColor: '#F4E4CE', position: 'relative', marginBottom: '-48px' }}>
      <Link href="/" aria-label={`${BRAND_NAME} — return to homepage`} style={{ display: 'block' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Fjordleather — Crafted by Hand"
          style={{ display: 'block', marginLeft: '1%', width: '80%', maxWidth: '1085px', height: 'auto' }}
        />
      </Link>
      {/* Gradient fade — blends logo bottom edge into nav */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to bottom, transparent, rgba(244,228,206,0.6) 40%, #F4E4CE)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
