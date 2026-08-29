interface SectionLabelProps {
  number: string
  title: string
  className?: string
}

export function SectionLabel({ title, className = '' }: SectionLabelProps) {
  return (
    <div className={`${className}`}>
      <span className="pill-badge bg-signal/15 text-ink text-xs font-medium tracking-wide">
        {title}
      </span>
    </div>
  )
}
