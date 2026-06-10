import { motion } from 'motion/react'
import { ContactForm } from '../components/ContactForm'
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  LINKEDIN_LABEL,
  LOCATION,
} from '@/models/contact.data'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const STEPS = [
  'Recibimos tu mensaje y lo leemos el mismo día.',
  'Te respondemos con preguntas específicas sobre el proceso.',
  'Coordinamos una llamada de 30 minutos.',
  'Te enviamos un documento con qué automatizamos, cómo y cuánto cuesta.',
]

const CONTACT_INFO = [
  { label: 'EMAIL', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'LINKEDIN', value: `${LINKEDIN_LABEL} →`, href: LINKEDIN_URL },
]

const LABEL_COLOR = 'oklch(0.45 0.05 87)'

export function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1
              className="text-headline mb-5"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                color: 'var(--color-heading)',
                textWrap: 'balance',
                maxWidth: '16ch',
              }}
            >
              Diagnóstico gratuito de automatización.
            </h1>
            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Analizamos tu operación y te decimos qué se puede automatizar,
              cuánto tiempo libera y qué cuesta. Sin compromiso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">

            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <h2
                className="font-display font-bold text-xl mb-8"
                style={{ color: 'var(--color-heading)' }}
              >
                Contanos el problema.
              </h2>
              <ContactForm />
            </motion.div>

            {/* Info column */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {/* Steps */}
              <div>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-6"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Qué pasa después
                </p>
                <ol className="space-y-4">
                  {STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="font-mono text-xs shrink-0 mt-0.5 w-6"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        0{i + 1}.
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contact direct */}
              <div
                className="border-t pt-10"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-6"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Contacto directo
                </p>
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <div key={item.label}>
                      <p
                        className="font-mono text-xs mb-1"
                        style={{ color: LABEL_COLOR }}
                      >
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-mono text-sm transition-colors duration-150
                          text-[var(--color-text)] hover:text-[var(--color-brand)] outline-none
                          focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
                          focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}

                  <div>
                    <p
                      className="font-mono text-xs mb-1"
                      style={{ color: LABEL_COLOR }}
                    >
                      UBICACIÓN
                    </p>
                    <span
                      className="font-mono text-sm"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {LOCATION}
                    </span>
                  </div>

                  <div>
                    <p
                      className="font-mono text-xs mb-1"
                      style={{ color: LABEL_COLOR }}
                    >
                      RESPUESTA
                    </p>
                    <span
                      className="font-mono text-sm"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      Menos de 24 horas hábiles.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
