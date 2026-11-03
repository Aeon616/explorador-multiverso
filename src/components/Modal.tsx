import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  labelledBy: string
  onClose: () => void
  children: ReactNode
}

/** Base de todos los modales: <dialog> nativo controlado con useRef y showModal(). */
export default function Modal({ open, labelledBy, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      // Se dispara tambien con Esc: asi el estado de React no queda desincronizado.
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border-3 border-ink bg-white p-6 text-ink shadow-hard backdrop:bg-ink/60"
    >
      {children}
    </dialog>
  )
}
