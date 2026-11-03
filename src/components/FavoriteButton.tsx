import type { Character, FavoriteProps } from '../types'

interface FavoriteButtonProps extends FavoriteProps {
  character: Character
}

export default function FavoriteButton({
  character,
  favorites,
  onToggleFavorite,
}: FavoriteButtonProps) {
  const isFavorite = favorites.some((favorite) => favorite.id === character.id)

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite ? `Quitar a ${character.name} de favoritos` : `Agregar a ${character.name} a favoritos`
      }
      onClick={() => onToggleFavorite(character)}
      className={`grid size-11 cursor-pointer place-items-center rounded-full border-2 border-ink text-2xl leading-none transition-transform hover:scale-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        isFavorite ? 'bg-morty text-ink' : 'bg-white text-ink/40'
      }`}
    >
      <span aria-hidden="true">★</span>
    </button>
  )
}
