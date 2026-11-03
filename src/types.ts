export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  gender: string
  origin: { name: string }
  location: { name: string }
  image: string
  episode: string[]
}

export interface CharactersResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: Character[]
}

export type ToastType = 'success' | 'error' | 'info'

export interface ToastData {
  id: number
  type: ToastType
  message: string
}

/** Props que App reparte a las paginas que muestran personajes. */
export interface FavoriteProps {
  favorites: Character[]
  onToggleFavorite: (character: Character) => void
}

export type ShowToast = (type: ToastType, message: string) => void
