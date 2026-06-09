import { useState } from 'react'

interface FormData {
  nombre: string
  email: string
  area: string
  descripcion: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const INITIAL: FormData = {
  nombre: '',
  email: '',
  area: '',
  descripcion: '',
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Formspree endpoint — reemplazar con el ID real
      const res = await fetch('https://formspree.io/f/PLACEHOLDER', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
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

  return { formData, status, handleChange, handleSubmit }
}
