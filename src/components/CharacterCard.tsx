import { Link } from 'react-router-dom'
import type { Character, FavoriteProps } from '../types'
import { placeLabel, speciesLabel } from '../utils/labels'
import FavoriteButton from './FavoriteButton'
import StatusBadge from './StatusBadge'

interface CharacterCardProps extends FavoriteProps {
  character: Character
}

export default function CharacterCard({ character, ...favoriteProps }: CharacterCardProps) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border-3 border-ink bg-white shadow-hard">
      <img
        src={character.image}
        alt={`Retrato de ${character.name}`}
        loading="lazy"
        className="aspect-square w-full border-b-3 border-ink object-cover"
      />
      <div className="absolute top-3 right-3">
        <FavoriteButton character={character} {...favoriteProps} />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-xl leading-tight font-extrabold">
          <Link to={`/explorar/${character.id}`} className="hover:underline">
            {character.name}
          </Link>
        </h3>
        <p className="text-sm">
          <StatusBadge status={character.status} /> ({speciesLabel(character.species)})
        </p>
        <p className="mt-1 text-sm text-muted">Origen: {placeLabel(character.origin.name)}</p>
      </div>
    </article>
  )
}
