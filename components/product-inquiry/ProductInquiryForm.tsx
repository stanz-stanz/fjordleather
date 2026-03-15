'use client'

import { useState, FormEvent } from 'react'

interface Props {
  productName: string
  productSlug: string
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--color-stone)',
  borderRadius: 0,
  padding: '0 0 10px 0',
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: '15px',
  lineHeight: 1.5,
  color: 'var(--color-obsidian)',
  outline: 'none',
  transition: 'border-color var(--duration-gentle) var(--ease-in-out)',
  caretColor: 'var(--color-cognac)',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--color-stone)',
  marginBottom: '6px',
}

const DEFAULT_MESSAGE = (name: string) =>
  `Hello,\nI'm interested in the ${name} and would like to know:\n\nThank you.`

export default function ProductInquiryForm({ productName, productSlug }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(DEFAULT_MESSAGE(productName))
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)

  const borderFor = (field: string): React.CSSProperties => ({
    borderBottom: focused === field
      ? '1px solid var(--color-obsidian)'
      : '1px solid var(--color-stone)',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: `Inquiry — ${productName}`,
          message: `Product: ${productName}\nURL: /products/${productSlug}\n\n${message}`,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Something went wrong')
      }
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSending(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-chalk)',
          backgroundColor: 'var(--color-obsidian)',
          border: 'none',
          borderRadius: 0,
          padding: '14px 32px',
          cursor: 'pointer',
          width: '100%',
          transition: 'background-color var(--duration-gentle)',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-bark)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-obsidian)')}
      >
        Inquire About This Piece →
      </button>
    )
  }

  if (sent) {
    return (
      <div style={{ paddingTop: '8px' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '22px',
          color: 'var(--color-obsidian)',
          margin: '0 0 8px',
        }}>
          Message sent.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '15px',
          color: 'var(--color-stone)',
          margin: 0,
        }}>
          We&apos;ll be in touch within 24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Name */}
      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          style={{ ...inputStyle, ...borderFor('name') }}
        />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          style={{ ...inputStyle, ...borderFor('email') }}
        />
      </div>

      {/* Message — pre-filled */}
      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          required
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle,
            ...borderFor('message'),
            resize: 'vertical',
            minHeight: '120px',
            lineHeight: 1.6,
          }}
        />
      </div>

      {error && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-error)', margin: 0 }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button
          type="submit"
          disabled={sending}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-chalk)',
            backgroundColor: 'var(--color-obsidian)',
            border: 'none',
            borderRadius: 0,
            padding: '14px 32px',
            cursor: sending ? 'default' : 'pointer',
            opacity: sending ? 0.6 : 1,
            transition: 'background-color var(--duration-gentle)',
          }}
          onMouseEnter={e => { if (!sending) e.currentTarget.style.backgroundColor = 'var(--color-bark)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-obsidian)' }}
        >
          {sending ? 'Sending…' : 'Send Inquiry'}
        </button>

        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '0.05em',
            color: 'var(--color-stone)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Cancel
        </button>
      </div>

    </form>
  )
}
