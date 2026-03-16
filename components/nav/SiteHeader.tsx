import Link from 'next/link'
import { BRAND_NAME } from '@/lib/constants'

export default function SiteHeader() {
  return (
    <div style={{ backgroundColor: '#FFEFD9', marginBottom: '-48px' }}>
      <Link href="/" aria-label={`${BRAND_NAME} — return to homepage`} style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo_modified.png"
          alt="Fjordleather — Crafted by Hand"
          width={1536}
          height={1024}
          className="site-header-logo"
        />
        {/* Four-edge fade overlay — blends logo into background colour */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          background: [
            'linear-gradient(to right,  #FFEFD9 0%, transparent 14%)',
            'linear-gradient(to left,   #FFEFD9 0%, transparent 14%)',
            'linear-gradient(to bottom, #FFEFD9 0%, transparent 22%)',
            'linear-gradient(to top,    #FFEFD9 0%, transparent 14%)',
          ].join(', '),
          pointerEvents: 'none',
        }} />
      </Link>
      {/* Gradient below the image — blends into nav without covering the logo */}
      <div aria-hidden="true" style={{
        height: '48px',
        background: 'linear-gradient(to bottom, #FFEFD9, rgba(255,239,217,0.6) 60%, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
