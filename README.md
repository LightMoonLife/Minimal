# Portfolio

A minimal, document-style portfolio for a CRO & UX specialist. Built with Next.js 15, Tailwind CSS, and TypeScript.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Email:** Resend
- **Deployment:** Vercel (recommended)

## Getting started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key — get one free at resend.com |
| `CONTACT_EMAIL` | The email address that receives contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Your site's public URL, e.g. `https://yourdomain.com` |

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000.

---

## Personalising the content

All content lives in two files — no CMS required.

### Your details (name, bio, links)

Search for `Your Name`, `hello@yourdomain.com`, `yourprofile`, and `YN` across the codebase and replace with your real values. Key files:

- `src/app/layout.tsx` — site-wide metadata and title template
- `src/app/page.tsx` — homepage bio and contact links
- `src/app/cv/page.tsx` — about page header
- `src/components/Navigation.tsx` — initials in the nav (`YN`)
- `src/components/Footer.tsx` — name and links

### Portfolio projects

Edit `src/lib/projects.ts`. Each project object has:

```typescript
{
  slug: string           // URL: /portfolio/[slug]
  title: string
  tagline: string
  client: string         // Industry description (not client name)
  year: string
  services: string[]
  heroMetric: { value, label, context? }
  overview: string
  challenge: string
  approach: [{ number, title, description }]
  results: [{ value, label, context? }]
  learnings: string[]
}
```

Add, remove, or reorder items in the `projects` array. Page routes are generated automatically via `generateStaticParams`.

### CV / background

Edit `src/lib/cv-data.ts` to update experience, education, skills, and certifications.

---

## Deployment

### Vercel (recommended)

1. Push your repo to GitHub
2. Import the project at vercel.com
3. Add environment variables in Settings > Environment Variables
4. Deploy — Vercel handles the rest

### Self-hosted (Node.js)

```bash
npm run build
npm start
```

Use nginx or Caddy as a reverse proxy in front of `next start` on port 3000.

PM2 example:

```bash
npm install -g pm2
pm2 start npm --name portfolio -- start
pm2 save
```

### Docker

Add `output: 'standalone'` to `next.config.ts`, then:

```dockerfile
FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Contact form

The contact form uses Resend via a Next.js API route at `/api/contact`.

- Free tier: 3,000 emails/month
- To use your own domain as the sender, verify it in Resend and update the `from` address in `src/app/api/contact/route.ts`
- Without a verified domain, the sender must remain `onboarding@resend.dev`

---

## Accessibility

- WCAG 2.1 AA compliant
- Skip-to-content link
- Semantic HTML and proper heading hierarchy
- `prefers-reduced-motion` respected in CSS
- ARIA labels on all interactive elements
- Keyboard-navigable mobile navigation
