'use client'

import { useEffect, useState } from 'react'
import { HERO_PHRASES } from '@/data/hero-phrases'

export default function HeroHeading() {
  const [phrase, setPhrase] = useState<string | null>(null)

  useEffect(() => {
    const idx = Math.floor(Math.random() * HERO_PHRASES.length)
    setPhrase(HERO_PHRASES[idx])
  }, [])

  // Render nothing until client picks a phrase (avoids hydration mismatch)
  if (!phrase) return null

  const lines = phrase.split(' / ')

  return (
    <h1 style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: 'clamp(60px, 9vw, 104px)',
      lineHeight: '0.95',
      letterSpacing: '-0.03em',
      color: 'var(--color-obsidian)',
      marginBottom: '48px',
    }}>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </h1>
  )
}
