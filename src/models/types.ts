export interface Service {
  id: string
  slug: string
  secNumber: string
  name: string
  tagline: string
  description: string
  capabilities: string[]
  techTags: string[]
}

export interface CaseStudy {
  id: string
  /** Nombre del cliente; null cuando el caso se publica sin cliente */
  client: string | null
  title: string
  summary: string
  tags: string[]
  status: 'En producción' | 'Entregado'
}

export interface NavItem {
  label: string
  href: string
}

export interface Value {
  number: string
  title: string
  body: string
}
