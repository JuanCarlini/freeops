interface SectionLabelProps {
  code: string
  title?: string
  className?: string
}

export function SectionLabel({ code, title, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-8 ${className}`}>
      <span
        className="font-mono text-xs tracking-widest uppercase"
        style={{ color: 'var(--color-accent)' }}
      >
        [{code}]
      </span>
      {title && (
        <>
          <span style={{ color: 'var(--color-border)' }} className="font-mono text-xs">
            /
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--color-muted)' }}
          >
            {title}
          </span>
        </>
      )}
    </div>
  )
}
