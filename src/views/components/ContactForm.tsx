import { useContactForm } from '@/controllers/useContactForm'
import { Button } from './primitives/Button'

const AREAS = [
  'Customer Ops — Atención automatizada',
  'Internal Ops — Procesos internos',
  'Sales Ops — Automatización comercial',
  'Finance Ops — Facturas y conciliación',
  'Infra Ops — Infraestructura',
  'No sé todavía — quiero el diagnóstico',
]

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  outline: 'none',
  transition: 'border-color 0.15s ease',
}

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
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
    </div>
  )
}

export function ContactForm() {
  const { formData, status, handleChange, handleSubmit } = useContactForm()

  const focusStyle = {
    borderColor: 'var(--color-brand)',
  }

  if (status === 'success') {
    return (
      <div
        className="p-10 text-center border"
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
        <p className="text-xl font-display font-bold mb-2" style={{ color: 'var(--color-heading)' }}>
          Lo recibimos.
        </p>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Te respondemos en menos de 24 horas hábiles.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field id="nombre" label="Nombre">
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          autoComplete="name"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Juan García"
          style={inputBase}
          onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </Field>

      <Field id="email" label="Email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="juan@empresa.com"
          style={inputBase}
          onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </Field>

      <Field id="area" label="Área de interés">
        <select
          id="area"
          name="area"
          required
          value={formData.area}
          onChange={handleChange}
          style={inputBase}
          onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
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

      <Field id="descripcion" label="Descripción del problema">
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={5}
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Describí el proceso que querés automatizar o el problema que tenés..."
          style={{ ...inputBase, resize: 'none' }}
          onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm" style={{ color: 'oklch(0.50 0.18 20)' }}>
          Error al enviar. Intentá de nuevo o escribinos a hola@freeops.ai
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'sending'}
        className="w-full justify-center"
      >
        {status === 'sending' ? 'Enviando...' : 'Solicitar diagnóstico →'}
      </Button>
    </form>
  )
}
