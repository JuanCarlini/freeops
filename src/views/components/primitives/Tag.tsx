interface TagProps {
  label: string
  accent?: boolean
}

export function Tag({ label, accent = false }: TagProps) {
  return (
    <span
      className="inline-block font-mono text-xs px-2 py-0.5 border"
      style={{
        borderColor: accent ? 'var(--color-accent-dark)' : 'var(--color-border)',
        color: accent ? 'var(--color-accent)' : 'var(--color-muted)',
        backgroundColor: 'transparent',
      }}
    >
      {label}
    </span>
  )
}
