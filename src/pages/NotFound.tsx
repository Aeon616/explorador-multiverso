import { Link } from 'react-router-dom'
import { buttonPrimary } from '../utils/styles'

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 bg-space px-4 py-20 text-center text-white">
      <p className="font-display text-8xl font-extrabold text-portal sm:text-9xl">404</p>
      <h1 className="font-display text-3xl font-extrabold">Esta página no existe en esta dimensión</h1>
      <p className="text-white/85">Revisa la dirección o vuelve al inicio.</p>
      <Link to="/" className={`${buttonPrimary} mt-2`}>
        Volver al inicio
      </Link>
    </section>
  )
}
