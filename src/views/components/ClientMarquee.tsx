import { CLIENTS } from '@/models/casos.data'

/**
 * Franja de clientes con scroll horizontal infinito.
 * Dos copias idénticas del track + translateX(-50%) en loop = sin saltos.
 * Con prefers-reduced-motion la animación se apaga y queda la fila estática.
 */
export function ClientMarquee() {
  // Repite la lista para llenar el ancho en pantallas grandes
  const names = Array.from({ length: 4 }, () => CLIENTS).flat()

  return (
    <section
      aria-label="Clientes con los que trabajamos"
      className="overflow-hidden border-y py-8 md:py-10"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-16 md:gap-24 shrink-0 pr-16 md:pr-24"
            aria-hidden={copy === 1 || undefined}
          >
            {names.map((name, i) => (
              <span
                key={`${copy}-${i}`}
                className="font-display font-bold text-2xl md:text-3xl tracking-tight whitespace-nowrap select-none"
                style={{ color: 'oklch(0.55 0.05 87)' }}
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
