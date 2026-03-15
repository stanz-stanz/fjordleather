'use client';

import { useState, FormEvent } from 'react';
import { CONTACT_EMAIL } from '@/lib/constants';

/* ── Types ─────────────────────────────────────────────────────── */

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ── Shared input label style ──────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  fontSize: '15px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--color-stone)',
  marginBottom: '8px',
};

/* ── Shared input style ────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--color-stone)',
  borderRadius: 0,
  padding: '0 0 12px 0',
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: 1.5,
  color: 'var(--color-obsidian)',
  outline: 'none',
  transition: 'border-color var(--duration-gentle) var(--ease-in-out)',
  caretColor: 'var(--color-cognac)',
};

/* ── Page ──────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [focused, setFocused] = useState<keyof FormState | null>(null);

  /* Focus handlers inject obsidian border */
  const handleFocus = (field: keyof FormState) => setFocused(field);
  const handleBlur = () => setFocused(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Something went wrong');
      }
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  /* Focused border override */
  const fieldBorder = (field: keyof FormState): React.CSSProperties => ({
    borderBottom:
      focused === field
        ? '1px solid var(--color-obsidian)'
        : '1px solid var(--color-stone)',
  });

  return (
    <main id="main-content">
      <section
        aria-label="Contact"
        style={{
          backgroundColor: 'var(--color-chalk)',
          minHeight: '100vh',
          paddingTop: '48px',
          paddingBottom: '96px',
        }}
      >
        <div className="container-fiord">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '80px',
              alignItems: 'start',
            }}
            className="lg:grid-cols-[9fr_11fr] lg:gap-24"
          >

            {/* ── LEFT: editorial text ─────────────────────────── */}
            <div style={{ paddingTop: '8px' }}>
              {/* Overline */}
              <p
                className="text-style-overline"
                style={{ color: 'var(--color-stone)', marginBottom: '24px' }}
              >
                Reach Us
              </p>

              {/* Heading */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: '48px',
                  lineHeight: 1.0,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-obsidian)',
                  margin: '0 0 24px',
                }}
              >
                We&apos;d like to
                <br />
                <em style={{ fontStyle: 'italic' }}>hear</em> from you.
              </h1>

              {/* Body copy */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 1.7,
                  color: 'var(--color-obsidian)',
                  margin: '0 0 36px',
                  maxWidth: '500px',
                }}
              >
                Questions about a specific piece, commissions, or materials —
                we respond to every message personally.
              </p>

              {/* Direct email */}
              <div style={{ marginBottom: '16px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: 'var(--color-stone)',
                    margin: 0,
                  }}
                >
                  Or write directly:
                  <br />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '14px',
                      color: 'var(--color-obsidian)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-obsidian)',
                      paddingBottom: '1px',
                      transition: 'opacity var(--duration-gentle)',
                    }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* ── RIGHT: contact form ──────────────────────────── */}
            <div>
              {submitted ? (
                /* Submitted state */
                <div
                  style={{
                    paddingTop: '40px',
                    paddingBottom: '40px',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: '28px',
                      lineHeight: 1.25,
                      color: 'var(--color-obsidian)',
                      margin: '0 0 16px',
                    }}
                  >
                    Your message is on its way.
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '15px',
                      lineHeight: 1.65,
                      color: 'var(--color-stone)',
                      margin: '0 0 40px',
                    }}
                  >
                    We&apos;ll respond to{' '}
                    <span style={{ color: 'var(--color-obsidian)' }}>
                      {form.email}
                    </span>{' '}
                    as soon as possible.
                  </p>
                  <a
                    href="/catalog"
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-obsidian)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-obsidian)',
                      paddingBottom: '4px',
                      transition: 'opacity var(--duration-gentle)',
                    }}
                  >
                    Back to the Collection
                  </a>
                </div>
              ) : (
                /* Contact form */
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '40px',
                    }}
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" style={labelStyle}>
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                        aria-required="true"
                        autoComplete="name"
                        style={{ ...inputStyle, ...fieldBorder('name') }}
                        placeholder=""
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" style={labelStyle}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        required
                        aria-required="true"
                        autoComplete="email"
                        style={{ ...inputStyle, ...fieldBorder('email') }}
                        placeholder=""
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" style={labelStyle}>
                        Subject{' '}

                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        style={{ ...inputStyle, ...fieldBorder('subject') }}
                        placeholder=""
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" style={labelStyle}>
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        required
                        aria-required="true"
                        rows={6}
                        style={{
                          display: 'block',
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          borderBottom:
                            focused === 'message'
                              ? '1px solid var(--color-obsidian)'
                              : '1px solid var(--color-stone)',
                          borderRadius: 0,
                          padding: '0 0 12px 0',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 300,
                          fontSize: '16px',
                          lineHeight: 1.6,
                          color: 'var(--color-obsidian)',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border-color var(--duration-gentle) var(--ease-in-out)',
                          caretColor: 'var(--color-cognac)',
                          minHeight: '120px',
                        }}
                      />
                    </div>

                    {/* Error */}
                    {sendError && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-error)', margin: 0 }}>
                        {sendError}
                      </p>
                    )}

                    {/* Submit */}
                    <div>
                      <button
                        type="submit"
                        disabled={sending}
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
                          minWidth: '180px',
                          height: '52px',
                          cursor: 'pointer',
                          transition: 'background-color var(--duration-gentle) var(--ease-in-out)',
                          width: '100%',
                        }}
                        className="lg:w-auto"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            'var(--color-bark)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            'var(--color-obsidian)';
                        }}
                      >
                        {sending ? 'Sending…' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
