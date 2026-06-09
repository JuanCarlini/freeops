interface AsciiBlockProps {
  art: string
  className?: string
  dim?: boolean
}

export function AsciiBlock({ art, className = '', dim = false }: AsciiBlockProps) {
  return (
    <pre
      className={`font-mono text-xs leading-relaxed whitespace-pre select-none ${className}`}
      style={{
        color: dim ? 'var(--color-border)' : 'var(--color-muted)',
        letterSpacing: '0.05em',
      }}
      aria-hidden="true"
    >
      {art}
    </pre>
  )
}
