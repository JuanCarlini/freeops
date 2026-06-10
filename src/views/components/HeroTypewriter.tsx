import { useTypewriter } from '@/controllers/useTypewriter'

const PHRASES = [
  'Liberamos operaciones.',
  'Automatizamos lo que existe.',
  'Eliminamos fricción con IA.',
  'Construimos sistemas que funcionan.',
]

export function HeroTypewriter() {
  const { displayText } = useTypewriter({
    strings: PHRASES,
    speed: 55,
    deleteSpeed: 25,
    pauseDuration: 2500,
  })

  return (
    <div className="min-h-[1.2em]">
      <span
        className="font-mono text-sm tracking-widest uppercase"
        style={{ color: 'var(--color-accent)' }}
      >
        {displayText}
        <span
          className="cursor-blink ml-0.5 inline-block w-0.5 h-4 align-middle"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </span>
    </div>
  )
}
