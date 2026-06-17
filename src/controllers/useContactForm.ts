import { useState } from 'react'
import { CONTACT_EMAIL } from '@/models/contact.data'

const FORMSPREE_URL = 'https://formspree.io/f/mzdqjqjl'

interface FormData {
  nombre: string
  email: string
  area: string
  descripcion: string
}

export type FieldErrors = Partial<Record<keyof FormData, string>>

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'

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

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormData
    setFormData((prev) => ({ ...prev, [name]: e.target.value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(formData)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        formData.nombre.trim(),
          email:       formData.email.trim(),
          area:        formData.area,
          message:     formData.descripcion.trim(),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setFormData(INITIAL)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setFormData(INITIAL)
    setErrors({})
    setStatus('idle')
  }

  return { formData, errors, status, handleChange, handleSubmit, reset, contactEmail: CONTACT_EMAIL }
}
