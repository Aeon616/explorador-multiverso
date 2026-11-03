import { useId, useState } from 'react'
import type { ShowToast } from '../types'
import { buttonPrimary } from '../utils/styles'
import Modal from './Modal'

interface NewsletterDialogProps {
  open: boolean
  onClose: () => void
  showToast: ShowToast
}

/*
 * ⚠️ DARK PATTERN INTENCIONAL (requisito academico del proyecto).
 * Este modal manipula a proposito para que la persona acepte. Patrones usados:
 *
 * 1. Confirmshaming: la opcion de rechazo hace sentir mal a quien la elige
 *    ("No, prefiero quedarme sin saber nada").
 * 2. Jerarquia visual enganosa: aceptar es un boton grande y llamativo; rechazar
 *    es un texto pequeno y gris que casi no parece clicable.
 * 3. Casilla premarcada: compartir datos con terceros viene activado por defecto,
 *    asi que quien no lo lee "consiente" sin darse cuenta.
 * 4. Urgencia falsa: "solo por hoy" no corresponde a ninguna oferta real.
 *
 * La version etica tendria dos botones con el mismo peso visual, textos neutros
 * ("Suscribirme" / "No, gracias") y la casilla desmarcada.
 * La suscripcion es simulada: no se guarda ni se envia ningun dato.
 */
export default function NewsletterDialog({ open, onClose, showToast }: NewsletterDialogProps) {
  const titleId = useId()
  const [shareData, setShareData] = useState(true) // Patron 3: premarcada.

  function accept() {
    onClose()
    showToast('success', 'Suscripción simulada: no se guardó ningún dato')
  }

  function decline() {
    onClose()
    showToast('info', 'No te suscribiste al boletín')
  }

  return (
    <Modal open={open} labelledBy={titleId} onClose={onClose}>
      <h2 id={titleId} className="font-display text-3xl font-extrabold">
        ¡Solo por hoy! Boletín interdimensional gratis
      </h2>
      <p className="mt-2 text-muted">
        Miles de Ricks ya reciben las novedades del multiverso. No seas el único Morty que se queda
        por fuera.
      </p>

      <label className="mt-4 flex items-start gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={shareData}
          onChange={(event) => setShareData(event.target.checked)}
          className="mt-0.5"
        />
        Compartir mis datos con socios de la Federación Galáctica
      </label>

      {/* Patron 2: el boton de aceptar domina toda la composicion. */}
      <button type="button" className={`${buttonPrimary} mt-5 w-full py-4 text-lg`} onClick={accept}>
        ¡Sí, quiero estar al día!
      </button>

      {/* Patrones 1 y 2: rechazo diminuto, gris y con texto culpabilizador. */}
      <button
        type="button"
        onClick={decline}
        className="mx-auto mt-3 block cursor-pointer text-xs text-muted/80"
      >
        No, prefiero quedarme sin saber nada
      </button>
    </Modal>
  )
}
