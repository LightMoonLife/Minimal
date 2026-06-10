import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#4E4C4A',
        muted: '#F5F5F5',
        'muted-foreground': '#9B9998',
        border: '#EBEBEB',
        accent: '#2D4395',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '680px',
      },
      letterSpacing: {
        widest: '0.2em',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
