'use client'

import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setState('success')
        form.reset()
      } else {
        const body = await res.json().catch(() => ({}))
        setErrorMessage(body.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-8">
        <p className="font-mono text-xs text-foreground mb-1">Message received.</p>
        <p className="font-mono text-xs text-muted-foreground">I&apos;ll be in touch within one working day.</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-transparent border-b border-border py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 max-w-md" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="block font-mono text-xs text-muted-foreground mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Your name"
          disabled={state === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs text-muted-foreground mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
          disabled={state === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell me about your project…"
          disabled={state === 'submitting'}
        />
      </div>

      {state === 'error' && (
        <p className="font-mono text-xs text-foreground" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="font-mono text-xs text-foreground hover:text-muted-foreground transition-colors duration-200 inline-flex items-center gap-2 disabled:opacity-40"
      >
        <span>{state === 'submitting' ? 'Sending…' : 'Send message'}</span>
        {state !== 'submitting' && <span aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
