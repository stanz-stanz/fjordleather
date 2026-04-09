import Link from 'next/link'
import { BRAND_NAME } from '@/lib/constants'

export default function SiteHeader() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', marginBottom: '-48px' }}>
      <Link href="/" aria-label={`${BRAND_NAME} — return to homepage`} style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo_white.png"
          alt="Fjordleather — Crafted by Hand"
          width={1536}
          height={1024}
          className="site-header-logo"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          }}
        />
      </Link>
      {/* Gradient below the image — blends into nav */}
      <div aria-hidden="true" style={{
        height: '48px',
        background: 'linear-gradient(to bottom, #FFFFFF, rgba(255,255,255,0.6) 60%, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
