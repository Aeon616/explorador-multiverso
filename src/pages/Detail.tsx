import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'
import Loader from '../components/Loader'
import StatusBadge from '../components/StatusBadge'
import { useFetch } from '../hooks/useFetch'
import type { Character, FavoriteProps, ShowToast } from '../types'
import { characterUrl } from '../utils/api'
import { genderLabel, placeLabel, speciesLabel } from '../utils/labels'
import { buttonPrimary } from '../utils/styles'

interface DetailProps extends FavoriteProps {
  showToast: ShowToast
}

export default function Detail({ favorites, onToggleFavorite, showToast }: DetailProps) {
  const { id = '' } = useParams()
  const { data: character, loading, error, notFound, retry } = useFetch<Character>(characterUrl(id))

  useEffect(() => {
    if (error) showToast('error', error)
  }, [error, showToast])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Link to="/explorar" className="font-bold underline">
        Volver a explorar
      </Link>

      {loading && <Loader label="Cargando personaje…" />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && notFound && (
        <EmptyState title="Este personaje no existe">
          <Link to="/explorar" className={buttonPrimary}>
            Ver todos los personajes
          </Link>
        </EmptyState>
      )}

      {!loading && character && (
        <article className="mt-6 grid overflow-hidden rounded-2xl border-3 border-ink bg-white shadow-hard md:grid-cols-2">
          <img
            src={character.image}
            alt={`Retrato de ${character.name}`}
            className="aspect-square w-full border-b-3 border-ink object-cover md:h-full md:border-r-3 md:border-b-0"
          />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight">
                {character.name}
              </h1>
              <FavoriteButton
                character={character}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <dt className="text-muted">Estado</dt>
              <dd><StatusBadge status={character.status} /></dd>
              <dt className="text-muted">Especie</dt>
              <dd className="font-bold">{speciesLabel(character.species)}</dd>
              <dt className="text-muted">Género</dt>
              <dd className="font-bold">{genderLabel(character.gender)}</dd>
              <dt className="text-muted">Origen</dt>
              <dd className="font-bold">{placeLabel(character.origin.name)}</dd>
              <dt className="text-muted">Ubicación</dt>
              <dd className="font-bold">{placeLabel(character.location.name)}</dd>
              <dt className="text-muted">Episodios</dt>
              <dd className="font-bold">{character.episode.length}</dd>
            </dl>
          </div>
        </article>
      )}
    </div>
  )
}
