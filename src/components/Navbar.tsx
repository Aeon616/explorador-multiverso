import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar({ favoriteCount }: { favoriteCount: number }) {
  return (
    <header className="border-b-3 border-ink bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight">
          Multiverso
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap gap-1 sm:gap-2">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-lg px-2 py-1.5 text-sm font-bold sm:px-3 sm:text-base ${
                      isActive ? 'bg-morty' : 'hover:bg-coat'
                    }`
                  }
                >
                  {link.label}
                  {link.to === '/favoritos' && favoriteCount > 0 && (
                    <span
                      aria-label={`${favoriteCount} guardados`}
                      className="ml-1.5 rounded-full bg-ink px-1.5 text-xs text-white"
                    >
                      {favoriteCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
