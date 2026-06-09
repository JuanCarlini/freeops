export const ASCII_HERO = `
┌─────────────────────────────────────────┐
│  INPUT         PROCESS         OUTPUT   │
│                                         │
│  [email]  ──►  [AGENT]  ──►  [ticket]  │
│  [form]   ──►  [RULES]  ──►  [CRM]     │
│  [PDF]    ──►  [AI]     ──►  [data]    │
│  [call]   ──►  [LOG]    ──►  [alert]   │
│                                         │
│              FREEOPS                    │
└─────────────────────────────────────────┘`

export const ASCII_CUSTOMER_OPS = `
 [WhatsApp] ──► [BOT] ──► [Chatwoot]
      │                        │
      ▼                        ▼
  [cliente]             [agente humano]
                    (solo cuando importa)`

export const ASCII_INTERNAL_OPS = `
 [PDF/email] ──► [extractor IA]
                      │
              ┌───────┴───────┐
              ▼               ▼
          [Dataverse]    [notificación]`

export const ASCII_SALES_OPS = `
 [lead entra] ──► [score IA] ──► [CRM]
                                   │
                              [follow-up]
                            (automático)`

export const ASCII_FINANCE_OPS = `
 [factura] ──► [OCR+IA] ──► [conciliación]
                                  │
                            [reporte auto]`

export const ASCII_INFRA_OPS = `
 [servidor] ──► [n8n self-hosted]
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
       [workflows]         [backups]`

export const ASCII_FLOW_GENERAL = `
┌──────────┐    ┌──────────┐    ┌──────────┐
│ DIAGNÓS- │ ─► │  DISEÑO  │ ─► │  IMPLE-  │
│   TICO   │    │          │    │MENTACIÓN │
└──────────┘    └──────────┘    └──────────┘
                                      │
                ┌─────────────────────┘
                ▼
┌──────────┐    ┌──────────┐
│  HANDOFF │ ◄─ │  PRUEBAS │
│          │    │          │
└──────────┘    └──────────┘`
