'use client'

import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ReviewForm() {
  const [state, setState] = useState<FormState>('idle')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Free Review Request',
          email: 'review@conv.site',
          message: `Free review requested for: ${url}`,
        }),
      })

      if (res.ok) {
        setState('success')
      } else {
        setErrorMessage('Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-12 text-center">
        <p className="text-2xl font-extralight text-foreground mb-4">Review requested.</p>
        <p className="font-mono text-xs text-muted-foreground">
          We&apos;ll send your free site review within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg mx-auto" aria-label="Free review form">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          placeholder="https://yourwebsite.com"
          disabled={state === 'submitting'}
          className="flex-1 bg-transparent border border-border px-4 py-3.5 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={state === 'submitting' || !url}
          className="bg-gradient-to-r from-pink-500 to-emerald-500 text-white font-mono text-xs tracking-widest px-8 py-3.5 hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 shrink-0"
        >
          {state === 'submitting' ? 'ANALYSING...' : 'ANALYSE MY SITE'}
        </button>
      </div>
      {state === 'error' && (
        <p className="font-mono text-xs text-foreground mt-4" role="alert">
          {errorMessage}
        </p>
      )}
      <p className="font-mono text-xs text-muted-foreground mt-4 text-center">
        No sign-up required. We&apos;ll review your site and email the results.
      </p>
    </form>
  )
}
