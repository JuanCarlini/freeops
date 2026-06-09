import type { CaseStudy } from './types'

export const CASES: CaseStudy[] = [
  {
    id: 'real-estate-01',
    industry: 'Real Estate',
    problem: 'Consultas de WhatsApp sin responder por horas. Leads perdidos en el fin de semana.',
    tags: ['Customer Ops', 'WhatsApp', 'n8n'],
    status: 'coming-soon',
  },
  {
    id: 'contaduria-01',
    industry: 'Contaduría',
    problem: 'Procesamiento manual de 200+ facturas por semana. Errores de conciliación constantes.',
    tags: ['Finance Ops', 'Claude API', 'Power Automate'],
    status: 'coming-soon',
  },
  {
    id: 'retail-01',
    industry: 'Retail',
    problem: 'Gestión de pedidos por WhatsApp sin sistema. Sin historial, sin métricas.',
    tags: ['Sales Ops', 'Customer Ops', 'WhatsApp'],
    status: 'coming-soon',
  },
  {
    id: 'agro-01',
    industry: 'Agro',
    problem: 'Reportes de campo manuales. Sin trazabilidad de operaciones.',
    tags: ['Internal Ops', 'n8n', 'Dataverse'],
    status: 'coming-soon',
  },
]
