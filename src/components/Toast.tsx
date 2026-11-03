import { useEffect } from 'react'
import type { ToastData, ToastType } from '../types'

const DURATION_MS = 4000

const STYLES: Record<ToastType, { className: string; label: string }> = {
  success: { className: 'bg-portal text-ink', label: 'Listo' },
  error: { className: 'bg-danger text-white', label: 'Error' },
  info: { className: 'bg-morty text-ink', label: 'Aviso' },
}

interface ToastProps {
  toast: ToastData
  onDismiss: (id: number) => void
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  const { className, label } = STYLES[toast.type]

  // Auto-dismiss; la limpieza evita que el timer corra si el toast ya se cerro.
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), DURATION_MS)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <div
      role={toast.type === 'error' ? 'alert' : 'status'}
      className={`flex animate-toast items-start justify-between gap-3 rounded-xl border-2 border-ink px-4 py-3 shadow-hard motion-reduce:animate-none ${className}`}
    >
      <p className="text-sm">
        <strong>{label}:</strong> {toast.message}
      </p>
      <button
        type="button"
        aria-label="Cerrar notificación"
        onClick={() => onDismiss(toast.id)}
        className="cursor-pointer text-lg leading-none font-bold"
      >
        ×
      </button>
    </div>
  )
}
