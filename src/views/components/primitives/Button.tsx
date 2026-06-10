import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost' | 'inverse'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const BASE =
  'inline-flex items-center gap-2 font-sans font-medium text-sm px-6 py-3 select-none ' +
  'rounded-[var(--radius-md)] transition-all duration-200 outline-none ' +
  'active:scale-[0.98] ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2'

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    'bg-[var(--color-brand)] text-[var(--color-on-brand)] ' +
    'hover:bg-[var(--color-brand-mid)] focus-visible:ring-offset-[var(--color-bg)]',
  outline:
    'bg-transparent text-[var(--color-brand)] border-[1.5px] border-[var(--color-brand)] ' +
    'hover:bg-[var(--color-brand)] hover:text-[var(--color-on-brand)] ' +
    'focus-visible:ring-offset-[var(--color-bg)]',
  ghost:
    'bg-transparent text-[var(--color-muted)] border-[1.5px] border-[var(--color-border)] ' +
    'hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] ' +
    'focus-visible:ring-offset-[var(--color-bg)]',
  inverse:
    'bg-[var(--color-on-brand)] text-[var(--color-brand)] ' +
    'hover:bg-[oklch(0.88_0.012_87)] focus-visible:ring-offset-[var(--color-brand)]',
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
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${
    disabled ? 'opacity-45 pointer-events-none' : ''
  } ${className}`

  if (href) {
    return (
      <Link to={href} className={classes} aria-disabled={disabled || undefined}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
