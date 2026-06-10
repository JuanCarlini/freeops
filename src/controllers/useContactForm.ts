import { useState } from 'react'
import { CONTACT_EMAIL } from '@/models/contact.data'

interface FormData {
  nombre: string
  email: string
  area: string
  descripcion: string
}

export type FieldErrors = Partial<Record<keyof FormData, string>>

type FormStatus = 'idle' | 'success'

const INITIAL: FormData = {
  nombre: '',
  email: '',
  area: '',
  descripcion: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {}
  if (data.nombre.trim().length < 2) {
    errors.nombre = 'Ingresá tu nombre.'
  }
  if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Ingresá un email válido, ej: nombre@empresa.com'
  }
  if (!data.area) {
    errors.area = 'Elegí un área para orientar el diagnóstico.'
  }
  if (data.descripcion.trim().length < 10) {
    errors.descripcion = 'Contanos un poco más: qué proceso es y cómo se hace hoy.'
  }
  return errors
}

function buildMailto(data: FormData): string {
  const subject = `Diagnóstico FREEOPS: ${data.nombre.trim()}`
  const body = [
    `Nombre: ${data.nombre.trim()}`,
    `Email: ${data.email.trim()}`,
    `Área de interés: ${data.area}`,
    '',
    'Descripción del problema:',
    data.descripcion.trim(),
  ].join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormData
    setFormData((prev) => ({ ...prev, [name]: e.target.value }))
    // Limpia el error del campo apenas el usuario lo corrige
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(formData)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    window.location.href = buildMailto(formData)
    setStatus('success')
  }

  const reset = () => {
    setFormData(INITIAL)
    setErrors({})
    setStatus('idle')
  }

  return { formData, errors, status, handleChange, handleSubmit, reset, contactEmail: CONTACT_EMAIL }
}
