import { useState, type FormEvent } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import FormField from '../components/FormField'
import type { ShowToast } from '../types'
import { buttonPrimary } from '../utils/styles'

interface ContactForm {
  nombre: string
  email: string
  mensaje: string
}

type Field = keyof ContactForm

const EMPTY_FORM: ContactForm = { nombre: '', email: '', mensaje: '' }

function validate(form: ContactForm): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (form.nombre.trim().length < 2) errors.nombre = 'El nombre debe tener al menos 2 caracteres'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Escribe un email válido, como nombre@correo.com'
  if (form.mensaje.trim().length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
  return errors
}

export default function Contact({ showToast }: { showToast: ShowToast }) {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [confirming, setConfirming] = useState(false)

  // Los errores se derivan del estado: no hace falta guardarlos en otro useState.
  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0

  // Cada campo se conecta igual, asi que estas props se generan una sola vez.
  function fieldProps(field: Field) {
    return {
      id: field,
      value: form[field],
      error: touched[field] ? errors[field] : undefined,
      onChange: (value: string) => setForm({ ...form, [field]: value }),
      onBlur: () => setTouched({ ...touched, [field]: true }),
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isValid) setConfirming(true)
  }

  function sendMessage() {
    // El proyecto no tiene backend de contacto: el envio se simula.
    setConfirming(false)
    setForm(EMPTY_FORM)
    setTouched({})
    showToast('success', 'Mensaje enviado')
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Contacto</h1>
      <p className="mt-2 mb-8 text-muted">¿Tienes preguntas o sugerencias? Escríbenos.</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 rounded-2xl border-3 border-ink bg-white p-6 shadow-hard"
      >
        <FormField label="Nombre" {...fieldProps('nombre')} />
        <FormField label="Email" type="email" {...fieldProps('email')} />
        <FormField label="Mensaje" multiline {...fieldProps('mensaje')} />
        <button type="submit" disabled={!isValid} className={buttonPrimary}>
          Enviar mensaje
        </button>
      </form>

      <ConfirmDialog
        open={confirming}
        title="¿Enviar este mensaje?"
        confirmLabel="Enviar"
        onConfirm={sendMessage}
        onCancel={() => setConfirming(false)}
      >
        Se enviará a nombre de <strong>{form.nombre}</strong> ({form.email}).
      </ConfirmDialog>
    </div>
  )
}
