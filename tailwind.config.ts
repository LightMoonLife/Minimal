import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-deep': 'rgb(var(--accent-deep) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      borderRadius: {
        card: '14px',
        pill: '100px',
      },
      letterSpacing: {
        widest: '0.16em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22, 1, .36, 1)',
      },
      transitionDuration: {
        '320': '320ms',
        '400': '400ms',
        '550': '550ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
