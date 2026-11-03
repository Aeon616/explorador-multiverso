import { Link } from 'react-router-dom'
import CharacterGrid from '../components/CharacterGrid'
import EmptyState from '../components/EmptyState'
import type { FavoriteProps } from '../types'
import { buttonPrimary } from '../utils/styles'

export default function Favorites({ favorites, onToggleFavorite }: FavoriteProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Mis favoritos
      </h1>
      <p className="mt-1 mb-8 font-bold text-muted">
        {favorites.length} {favorites.length === 1 ? 'personaje guardado' : 'personajes guardados'}
      </p>

      {favorites.length === 0 ? (
        <EmptyState title="No tienes favoritos guardados">
          <Link to="/explorar" className={buttonPrimary}>
            Explorar personajes
          </Link>
        </EmptyState>
      ) : (
        <CharacterGrid
          characters={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}
