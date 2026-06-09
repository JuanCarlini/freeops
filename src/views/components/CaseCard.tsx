import type { CaseStudy } from '@/models/types'
import { Tag } from './primitives/Tag'

interface CaseCardProps {
  caseStudy: CaseStudy
}

export function CaseCard({ caseStudy }: CaseCardProps) {
  const isComingSoon = caseStudy.status === 'coming-soon'

  return (
    <div
      className="border p-6 relative overflow-hidden"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {isComingSoon && (
        <div
          className="absolute top-3 right-3 font-mono text-xs px-2 py-0.5 border"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-muted)',
          }}
        >
          PRÓXIMAMENTE
        </div>
      )}

      <div
        className="font-mono text-xs mb-3 uppercase tracking-wider"
        style={{ color: 'var(--color-accent)' }}
      >
        {caseStudy.industry}
      </div>

      <p
        className={`text-base leading-relaxed mb-4 ${isComingSoon ? 'blur-[3px] select-none' : ''}`}
        style={{ color: 'var(--color-text)' }}
      >
        {caseStudy.problem}
      </p>

      <div className="flex flex-wrap gap-2">
        {caseStudy.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}
