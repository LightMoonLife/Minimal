import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-320 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-foreground hover:bg-accent-deep hover:text-white hover:-translate-y-0.5',
        outline:
          'border border-border/15 text-foreground hover:bg-panel hover:-translate-y-0.5',
        ghost:
          'text-muted-foreground hover:text-foreground hover:bg-panel/50',
        link:
          'text-muted-foreground hover:text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-7 py-3.5 rounded-pill',
        sm: 'px-5 py-2.5 rounded-pill text-xs',
        lg: 'px-8 py-4 rounded-pill',
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
