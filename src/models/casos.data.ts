import type { CaseStudy } from './types'

/**
 * Casos reales. Sin métricas inventadas: cada descripción sale de lo que
 * el sistema efectivamente hace en producción o hizo en la entrega.
 */
export const CASES: CaseStudy[] = [
  {
    id: 'midtown-agente',
    client: 'Midtown',
    title: 'Agente de WhatsApp con IA',
    summary:
      'Atiende consultas por texto, audio, imagen y PDF. Registra cada lead en Google Sheets, lo asigna al equipo comercial y mantiene memoria de conversación. El prompt se edita desde un Google Doc, sin tocar código.',
    tags: ['n8n', 'OpenAI', 'WhatsApp', 'Redis', 'Postgres', 'Google Sheets'],
    status: 'Entregado',
  },
  {
    id: 'laserhouse-agente',
    client: 'LaserHouse',
    title: 'Agente de atención por WhatsApp',
    summary:
      'Agente con IA que responde consultas de clientes por WhatsApp y deriva al equipo cuando hace falta. Corre en producción todos los días.',
    tags: ['n8n', 'OpenAI', 'WhatsApp'],
    status: 'En producción',
  },
  {
    id: 'analizador-facturas',
    client: null,
    title: 'Analizador de facturas',
    summary:
      'Las facturas que llegan a una carpeta de Drive se leen con IA y se cargan clasificadas en Google Sheets, con registro de cada documento procesado.',
    tags: ['n8n', 'Google Drive', 'IA', 'Google Sheets'],
    status: 'En producción',
  },
  {
    id: 'qala-landing',
    client: 'Qala',
    title: 'Landing page',
    summary:
      'Diseño y desarrollo del sitio: páginas rápidas, formulario conectado y deploy con dominio propio.',
    tags: ['Diseño web', 'Formularios', 'Hosting'],
    status: 'Entregado',
  },
]

/** Clientes para la franja marquee. */
export const CLIENTS = ['Qala', 'Midtown', 'LaserHouse']
