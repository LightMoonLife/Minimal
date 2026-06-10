interface SectionLabelProps {
  number: string
  title: string
  className?: string
}

export function SectionLabel({ number, title, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-xs text-muted-foreground tabular-nums">{number}</span>
      <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {title}
      </span>
    </div>
  )
}
