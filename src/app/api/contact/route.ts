import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown; message?: unknown }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, message } = body

  if (
    typeof name !== 'string' || name.trim().length === 0 ||
    typeof email !== 'string' || !email.includes('@') ||
    typeof message !== 'string' || message.trim().length === 0
  ) {
    return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 422 })
  }

  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 422 })
  }

  const to = process.env.CONTACT_EMAIL
  if (!to) {
    console.error('CONTACT_EMAIL env var is not set')
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    replyTo: email.trim(),
    subject: `Portfolio contact from ${name.trim()}`,
    text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
