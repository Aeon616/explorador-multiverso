import { buttonDanger } from '../utils/styles'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-20 text-center">
      <p className="font-display text-2xl font-extrabold text-danger">{message}</p>
      <p className="text-muted">Revisa tu conexión e intenta de nuevo.</p>
      <button type="button" className={buttonDanger} onClick={onRetry}>
        Reintentar
      </button>
    </div>
  )
}
