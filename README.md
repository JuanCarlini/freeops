# FREEOPS

Sitio web institucional de FREEOPS — estudio de automatización e inteligencia artificial con sede en Rosario, Argentina.

FREEOPS construye sistemas que eliminan el trabajo repetitivo en operaciones de empresas: atención al cliente, procesos internos, ventas, finanzas e infraestructura. Sin overhead, sin hype, con handoff real.

**[freeops.ai](https://freeops.ai)** · producción actual: [freeops.vercel.app](https://freeops.vercel.app)

## Stack

- React 19 + TypeScript (strict) + Vite 8
- Tailwind CSS v4 (tokens en `src/styles/index.css`)
- Motion 12 (animaciones) + React Router 7
- Deploy en Vercel · SPA estática + 1 serverless function (`api/track.ts`)

## Desarrollo local

Requiere Node `>=20.19` (CI usa 22).

```bash
npm ci              # instalar dependencias
npm run dev         # servidor de desarrollo
npm run typecheck   # TypeScript (strict) sobre src, e2e y api
npm run lint        # ESLint
npm run build       # typecheck + build de producción en dist/
npm run preview     # servir dist/ localmente
npm run test:e2e    # smoke tests de Playwright (buildea y sirve dist solo)
```

Primera vez con Playwright: `npx playwright install chromium`.

Para correr los smoke tests contra un deploy real en vez del build local:

```bash
PW_BASE_URL=https://freeops.vercel.app npm run test:e2e
```

## Estructura

```
api/            función serverless de Vercel (conteo de visitas)
e2e/            smoke tests de Playwright
src/
  models/       datos estáticos tipados (servicios, casos, contacto, nav)
  controllers/  lógica de UI (useContactForm: validación + mailto)
  views/        layout, páginas y componentes
  styles/       tokens de diseño y CSS global
vercel.json     rewrite SPA, headers de seguridad y cache
```

Datos editables sin tocar componentes: servicios en `src/models/services.data.ts`, casos y clientes del marquee en `src/models/casos.data.ts`, email/LinkedIn en `src/models/contact.data.ts` (cuando exista `hola@freeops.ai`, se cambia ahí y actualiza todo el sitio).

## Flujo de ramas y deploy

- `main` = producción (Vercel deploya cada merge).
- `dev` = trabajo diario; cada push genera un preview deployment en Vercel y corre el CI.
- Cambios llegan a producción por PR `dev → main`. El CI (typecheck + lint + build + smoke tests) debe estar verde antes de mergear.
- Rollback: en Vercel → proyecto → Deployments → **Instant Rollback** al deployment anterior.

### Checklist antes de mergear a main

1. CI verde en el PR.
2. Abrir el preview deployment y verificar: carga directa de `/servicios` y `/contacto` (no 404), consola sin errores de CSP propios del sitio.
3. Nota: la CSP bloquea el toolbar de comentarios de Vercel en previews (`vercel.live`); esos errores de consola son esperables y no afectan producción.

## Seguridad (vercel.json)

- **Rewrite SPA**: toda ruta que no sea `/api/*` sirve `index.html` (React Router resuelve). Sin esto, las rutas profundas dan 404.
- **CSP estricta**: solo recursos propios (`'self'`), sin scripts de terceros. Si algún día se agrega un script externo, hay que sumarlo explícitamente a la CSP.
- **Cache**: `/assets/*` (hasheados) se sirven con `max-age=31536000, immutable`; `index.html` se revalida siempre.
- Headers adicionales: `nosniff`, `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`.

## Log de visitas

Conteo anónimo en infraestructura propia, sin cookies, sin IP, sin user-agent (coherente con la página `/privacidad`):

1. En cada cambio de ruta, el cliente manda un beacon a `/api/track` con `{ path, referrer }`.
2. `api/track.ts` valida el payload, agrega país (header de geo de Vercel) y timestamp, y lo reenvía al webhook definido en `N8N_TRACK_WEBHOOK_URL` con el header `x-track-secret` (si `N8N_TRACK_SECRET` está definida).
3. El workflow de n8n guarda donde convenga (Google Sheets, Postgres) para revisión interna.

**Sin `N8N_TRACK_WEBHOOK_URL` configurada, la función responde 204 y no guarda nada.** Para activarlo: crear un workflow en n8n con trigger Webhook (POST), validar `x-track-secret`, y cargar ambas variables en Vercel → Settings → Environment Variables (Production). Variables documentadas en `.env.example`.

## Formulario de contacto

Deliberadamente **sin backend**: construye un `mailto:` con los datos validados y lo abre en el cliente de correo del visitante. No se envía nada a servidores propios (es la promesa de `/privacidad`). Si en el futuro se conecta a n8n/CRM, el patrón de `api/track.ts` (función + env vars + validación server-side) es la plantilla a seguir, y hay que actualizar `/privacidad`.
