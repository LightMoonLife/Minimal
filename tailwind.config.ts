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

        // Backward-compatible aliases for pages not yet migrated
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
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
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
