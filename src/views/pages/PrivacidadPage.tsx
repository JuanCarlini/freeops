import { motion } from 'motion/react'
import { CONTACT_EMAIL } from '@/models/contact.data'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const SECTIONS = [
  {
    title: 'Qué datos manejamos',
    body: 'Este sitio no usa cookies, no instala trackers y no tiene analítica de terceros. El formulario de contacto no envía datos a ningún servidor nuestro: abre tu propio cliente de correo con el mensaje cargado, y el envío lo hacés vos desde tu casilla.',
  },
  {
    title: 'Qué pasa con tu consulta',
    body: 'Los correos que nos mandás quedan en nuestra casilla y se usan únicamente para responderte y preparar el diagnóstico. No compartimos tu información con terceros ni la usamos para listas de difusión.',
  },
  {
    title: 'Proyectos de clientes',
    body: 'Los sistemas que construimos para clientes corren en infraestructura del cliente o contratada a su nombre. La información operativa de cada proyecto es del cliente y queda cubierta por los acuerdos de cada trabajo.',
  },
]

export function PrivacidadPage() {
  return (
    <section className="pt-32 pb-24" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1
            className="text-headline mb-12"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
              color: 'var(--color-heading)',
            }}
          >
            Privacidad.
          </h1>

          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2
                  className="font-sans font-semibold text-lg mb-3"
                  style={{ color: 'var(--color-heading)' }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-muted)', maxWidth: '65ch' }}
                >
                  {s.body}
                </p>
              </div>
            ))}

            <div>
              <h2
                className="font-sans font-semibold text-lg mb-3"
                style={{ color: 'var(--color-heading)' }}
              >
                Consultas
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-muted)', maxWidth: '65ch' }}
              >
                Si querés que borremos un correo tuyo o tenés cualquier duda sobre
                este tema, escribinos a{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium underline underline-offset-2
                    text-[var(--color-brand)] hover:text-[var(--color-accent)]
                    transition-colors duration-150"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
