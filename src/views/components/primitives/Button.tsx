import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const BASE =
  'inline-flex items-center gap-2 font-sans font-medium text-sm px-6 py-3 transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const VARIANTS: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-brand)',
    color: 'var(--color-on-brand)',
    borderRadius: 'var(--radius-md)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--color-brand)',
    border: '1.5px solid var(--color-brand)',
    borderRadius: 'var(--radius-md)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-muted)',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
  },
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...VARIANTS[variant],
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? 'not-allowed' : undefined,
  }

  if (href) {
    return (
      <Link to={href} className={`${BASE} ${className}`} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE} ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}
