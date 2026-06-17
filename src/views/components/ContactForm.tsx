import { useContactForm } from '@/controllers/useContactForm'
import { Button } from './primitives/Button'

const AREAS = [
  'Atención al cliente (Customer Ops)',
  'Procesos internos (Internal Ops)',
  'Ventas (Sales Ops)',
  'Facturas y conciliación (Finance Ops)',
  'Infraestructura (Infra Ops)',
  'Web y landing pages (Web Ops)',
  'No sé todavía, quiero el diagnóstico',
]

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-sm font-medium mb-2"
        style={{ color: 'var(--color-text)' }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm"
          style={{ color: 'var(--color-error)' }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const { formData, errors, status, handleChange, handleSubmit, reset, contactEmail } =
    useContactForm()

  if (status === 'success') {
    return (
      <div
        className="p-10 border"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <div
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Mensaje recibido
        </div>
        <p
          className="text-xl font-display font-bold mb-2"
          style={{ color: 'var(--color-heading)' }}
        >
          Lo recibimos.
        </p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
          Te respondemos en menos de 24 horas hábiles.
        </p>
        <Button onClick={reset} variant="outline">
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field id="nombre" label="Nombre" error={errors.nombre}>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre y apellido"
          className="form-input"
          aria-invalid={errors.nombre ? true : undefined}
          aria-describedby={errors.nombre ? 'nombre-error' : undefined}
        />
      </Field>

      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nombre@empresa.com"
          className="form-input"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </Field>

      <Field id="area" label="Área de interés" error={errors.area}>
        <select
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="form-input"
          aria-invalid={errors.area ? true : undefined}
          aria-describedby={errors.area ? 'area-error' : undefined}
        >
          <option value="" disabled>
            Seleccioná una opción
          </option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Field>

      <Field id="descripcion" label="Descripción del problema" error={errors.descripcion}>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={5}
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Qué proceso querés automatizar y cómo se hace hoy"
          className="form-input resize-none"
          aria-invalid={errors.descripcion ? true : undefined}
          aria-describedby={errors.descripcion ? 'descripcion-error' : undefined}
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm" style={{ color: 'oklch(0.50 0.18 20)' }}>
          Error al enviar. Intentá de nuevo o escribinos a{' '}
          <a
            href={`mailto:${contactEmail}`}
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {contactEmail}
          </a>
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'sending'}
        className="w-full justify-center"
      >
        {status === 'sending' ? 'Enviando...' : 'Pedir diagnóstico →'}
      </Button>
    </form>
  )
}
