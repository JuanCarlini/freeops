export interface Service {
  id: string
  slug: string
  secNumber: string
  name: string
  tagline: string
  description: string
  capabilities: string[]
  asciiIcon: string
  techTags: string[]
}

export interface CaseStudy {
  id: string
  industry: string
  problem: string
  solution?: string
  result?: string
  tags: string[]
  status: 'published' | 'coming-soon'
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
