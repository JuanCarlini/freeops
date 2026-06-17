/**
 * Conteo anónimo de visitas. Recibe el beacon del cliente y lo reenvía al
 * webhook de n8n definido en N8N_TRACK_WEBHOOK_URL. Sin esa variable la
 * función responde 204 y no guarda nada (no-op seguro).
 *
 * Privacidad: nunca se reenvían IP ni user-agent; solo ruta, referrer,
 * país (header de geolocalización de Vercel) y timestamp.
 *
 * Handler web estándar de Vercel Functions: sin dependencias, el runtime
 * lo provee la plataforma. Métodos distintos de POST responden 405 solos.
 */
export async function POST(request: Request): Promise<Response> {
  const webhook = process.env.N8N_TRACK_WEBHOOK_URL
  const visit = parsePayload(await readJson(request))

  if (webhook && visit) {
    const secret = process.env.N8N_TRACK_SECRET
    const country = request.headers.get('x-vercel-ip-country')
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(secret ? { 'x-track-secret': secret } : {}),
        },
        body: JSON.stringify({
          ...visit,
          country,
          ts: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(3000),
      })
    } catch {
      // El conteo nunca debe afectar la respuesta al visitante ni filtrar
      // detalles del webhook; los errores se descartan en silencio.
    }
  }

  return new Response(null, { status: 204 })
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return null
  }
}

function parsePayload(body: unknown): { path: string; referrer: string } | null {
  if (typeof body !== 'object' || body === null) return null
  const { path, referrer } = body as Record<string, unknown>
  if (typeof path !== 'string' || !path.startsWith('/') || path.length > 200) return null
  return {
    path,
    referrer: typeof referrer === 'string' ? referrer.slice(0, 300) : '',
  }
}
