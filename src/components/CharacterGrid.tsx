import type { Character, FavoriteProps } from '../types'
import CharacterCard from './CharacterCard'

interface CharacterGridProps extends FavoriteProps {
  characters: Character[]
}

export default function CharacterGrid({ characters, ...favoriteProps }: CharacterGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <li key={character.id} className="flex">
          <div className="w-full">
            <CharacterCard character={character} {...favoriteProps} />
          </div>
        </li>
      ))}
    </ul>
  )
}
