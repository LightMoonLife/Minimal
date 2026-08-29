import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 rounded-full',
  {
    variants: {
      variant: {
        default:
          'bg-signal text-ink hover:bg-ink hover:text-white shadow-[0_0.8rem_1.5rem_rgba(255,153,0,0.26)]',
        secondary:
          'bg-ink text-white hover:bg-signal hover:text-ink',
        outline:
          'border border-line text-ink hover:bg-surface',
        ghost:
          'text-ink-soft hover:text-ink hover:bg-surface/50',
        link:
          'text-ink-soft hover:text-ink underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-7 py-3 text-sm',
        sm: 'px-5 py-2.5 text-xs',
        lg: 'px-8 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
