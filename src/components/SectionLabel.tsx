interface SectionLabelProps {
  number: string
  title: string
  className?: string
}

export function SectionLabel({ number, title, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-xs text-blueprint font-mono tabular-nums">{number}</span>
      <span className="w-6 h-px bg-blueprint" aria-hidden="true" />
      <span className="text-xs tracking-widest text-ink-faint uppercase font-medium font-mono">
        {title}
      </span>
    </div>
  )
}
