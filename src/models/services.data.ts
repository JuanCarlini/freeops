import type { Service } from './types'

export const SERVICES: Service[] = [
  {
    id: 'customer-ops',
    slug: 'customer-ops',
    secNumber: 'SVC.01',
    name: 'Customer Ops',
    tagline: 'Atención automatizada que no parece automatizada.',
    description:
      'Agentes de WhatsApp y bots de soporte que resuelven sin escalar. Cuando no pueden, derivan con contexto completo.',
    capabilities: [
      'Agentes WhatsApp con IA (Claude API)',
      'Integración con Chatwoot y CRM',
      'Clasificación y ruteo automático de consultas',
      'Respuestas contextuales con historial',
      'Escalado inteligente a humano',
      'Logs y métricas de interacción',
    ],
    techTags: ['n8n', 'Claude API', 'WhatsApp Business', 'Chatwoot', 'Supabase'],
  },
  {
    id: 'internal-ops',
    slug: 'internal-ops',
    secNumber: 'SVC.02',
    name: 'Internal Ops',
    tagline: 'Lo que tarda horas, en minutos. Sin intervención.',
    description:
      'Agentes IA para procesos internos: extracción de documentos, clasificación, aprobaciones, notificaciones.',
    capabilities: [
      'Extracción de datos de PDFs y emails',
      'Clasificación automática de documentos',
      'Flujos de aprobación internos',
      'Integración con Microsoft 365 / Dataverse',
      'Notificaciones y alertas operativas',
      'Auditoría y trazabilidad',
    ],
    techTags: ['Power Automate', 'Claude API', 'Microsoft Dataverse', 'SharePoint', 'n8n'],
  },
  {
    id: 'sales-ops',
    slug: 'sales-ops',
    secNumber: 'SVC.03',
    name: 'Sales Ops',
    tagline: 'Follow-up, scoring y CRM al día sin carga manual.',
    description:
      'Automatizaciones comerciales: follow-up, scoring de leads, actualización de CRM, reportes de pipeline.',
    capabilities: [
      'Scoring de leads con IA',
      'Follow-up automático multicanal',
      'Sincronización de CRM',
      'Alertas de oportunidades estancadas',
      'Reportes de pipeline semanales automáticos',
      'Integración con formularios y landing pages',
    ],
    techTags: ['n8n', 'HubSpot', 'Airtable', 'Claude API', 'WhatsApp', 'Gmail'],
  },
  {
    id: 'finance-ops',
    slug: 'finance-ops',
    secNumber: 'SVC.04',
    name: 'Finance Ops',
    tagline: 'Facturas procesadas. Errores eliminados.',
    description:
      'Procesamiento automático de facturas, conciliación, y reportes financieros sin intervención manual.',
    capabilities: [
      'OCR + IA para extracción de facturas',
      'Conciliación automática de comprobantes',
      'Detección de anomalías y duplicados',
      'Reportes automáticos en Google Sheets',
      'Integración con sistemas de facturación',
      'Alertas de vencimientos',
    ],
    techTags: ['n8n', 'Claude API', 'Google Sheets', 'Power Automate', 'AFIP'],
  },
  {
    id: 'infra-ops',
    slug: 'infra-ops',
    secNumber: 'SVC.05',
    name: 'Infra Ops',
    tagline: 'Tu infraestructura de automatización, sin depender de nadie.',
    description:
      'Despliegue y operación de n8n self-hosted, infraestructura de automatización en VPS, backups y monitoreo.',
    capabilities: [
      'Setup de n8n self-hosted en VPS',
      'Configuración de dominios y SSL',
      'Backups automáticos de workflows',
      'Monitoreo y alertas de salud',
      'Migración desde n8n cloud',
      'Documentación de infraestructura',
    ],
    techTags: ['n8n', 'Docker', 'Hostinger VPS', 'Nginx', 'Cloudflare'],
  },
  {
    id: 'web-ops',
    slug: 'web-ops',
    secNumber: 'SVC.06',
    name: 'Web Ops',
    tagline: 'Landing pages que se conectan con tu operación.',
    description:
      'Diseño y desarrollo de landing pages y sitios institucionales con formularios conectados a tus flujos: cada consulta entra directo a tu WhatsApp, CRM o planilla.',
    capabilities: [
      'Diseño y desarrollo de landing pages',
      'Formularios conectados a WhatsApp, CRM o email',
      'Integración con flujos de automatización existentes',
      'SEO técnico de base y performance',
      'Hosting, dominio y SSL',
      'Cambios y mantenimiento post-entrega',
    ],
    techTags: ['React', 'TypeScript', 'Tailwind', 'Vercel', 'n8n'],
  },
]
