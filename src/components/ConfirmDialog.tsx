import { useId, type ReactNode } from 'react'
import { buttonDanger, buttonPrimary, buttonSecondary } from '../utils/styles'
import Modal from './Modal'

interface ConfirmDialogProps {
  open: boolean
  title: string
  confirmLabel: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
  children: ReactNode
}

export default function ConfirmDialog({
  open,
  title,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  const titleId = useId()

  return (
    <Modal open={open} labelledBy={titleId} onClose={onCancel}>
      <h2 id={titleId} className="font-display text-2xl font-extrabold">
        {title}
      </h2>
      <p className="mt-2 text-muted">{children}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" className={buttonSecondary} onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" className={danger ? buttonDanger : buttonPrimary} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
