const steps = [
  { number: '01', label: 'Audit', description: 'Map the gaps, quantify cost of inaction' },
  { number: '02', label: 'Strategise', description: 'Prioritise by commercial impact' },
  { number: '03', label: 'Build', description: 'Ship software, measure results' },
  { number: '04', label: 'Optimise', description: 'Test, compound, repeat' },
]

export function ProcessSteps() {
  return (
    <ol className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-label="Process steps">
      {steps.map((step, i) => (
        <li key={step.number} className="relative border border-border/10 rounded-card p-5 sm:p-6 bg-panel/50">
          {i < steps.length - 1 && (
            <span
              className="hidden sm:block absolute top-1/2 -right-2.5 text-accent/40 -translate-y-1/2 text-xs"
              aria-hidden="true"
            >
              &rarr;
            </span>
          )}
          <span className="font-mono text-xs text-accent-deep block mb-2">{step.number}</span>
          <p className="font-display text-base font-extrabold text-foreground mb-1">{step.label}</p>
          <p className="text-xs font-extralight text-muted-foreground leading-relaxed">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
