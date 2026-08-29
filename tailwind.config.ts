import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        'ink-faint': 'rgb(var(--ink-faint) / <alpha-value>)',
        blueprint: 'rgb(var(--blueprint) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',

        background: 'rgb(var(--bg) / <alpha-value>)',
        foreground: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--surface) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--ink-soft) / <alpha-value>)',
        border: 'var(--line)',
        accent: 'rgb(var(--blueprint) / <alpha-value>)',
        'accent-deep': 'rgb(var(--blueprint) / <alpha-value>)',
        panel: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--surface) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        section: 'var(--radius-lg)',
      },
      letterSpacing: {
        tight: '-0.04em',
        tighter: '-0.055em',
        widest: '0.16em',
      },
      boxShadow: {
        card: '0 0.8rem 2.2rem rgba(21, 21, 21, 0.08)',
        'card-hover': '0 1.35rem 3.4rem rgba(21, 21, 21, 0.14)',
        hero: '0 1.8rem 5rem rgba(21, 21, 21, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
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
