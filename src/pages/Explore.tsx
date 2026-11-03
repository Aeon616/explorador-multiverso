import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CharacterGrid from '../components/CharacterGrid'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import SearchFilters from '../components/SearchFilters'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import type { CharactersResponse, FavoriteProps, ShowToast } from '../types'
import { characterListUrl } from '../utils/api'
import { buttonSecondary } from '../utils/styles'

interface ExploreProps extends FavoriteProps {
  showToast: ShowToast
}

export default function Explore({ favorites, onToggleFavorite, showToast }: ExploreProps) {
  // Los filtros viven en la URL: al volver desde un detalle siguen aplicados.
  const [params, setParams] = useSearchParams()
  const name = params.get('nombre') ?? ''
  const status = params.get('estado') ?? ''
  const page = Number(params.get('pagina')) || 1

  const debouncedName = useDebounce(name, 400)
  const { data, loading, error, notFound, retry } = useFetch<CharactersResponse>(
    characterListUrl(debouncedName, status, page),
  )

  useEffect(() => {
    if (error) showToast('error', error)
  }, [error, showToast])

  function updateParams(changes: { nombre?: string; estado?: string; pagina?: number }) {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => {
      if (value && value !== 1) next.set(key, String(value))
      else next.delete(key)
    })
    setParams(next, { replace: true })
  }

  const results = data?.results ?? []
  const isEmpty = !loading && !error && (notFound || results.length === 0)

  return (
    <>
      <section className="border-b-3 border-ink bg-morty">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Explorar personajes
          </h1>
          <SearchFilters
            name={name}
            status={status}
            onNameChange={(value) => updateParams({ nombre: value, pagina: 1 })}
            onStatusChange={(value) => updateParams({ estado: value, pagina: 1 })}
          />
        </div>
      </section>

      <section aria-label="Resultados" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
        {isEmpty && (
          <EmptyState title="Ningún personaje coincide con tu búsqueda">
            <button type="button" className={buttonSecondary} onClick={() => setParams({})}>
              Limpiar filtros
            </button>
          </EmptyState>
        )}
        {!loading && !error && results.length > 0 && data && (
          <>
            <p className="mb-6 font-bold text-muted" aria-live="polite">
              Mostrando {results.length} de {data.info.count} resultados
            </p>
            <CharacterGrid
              characters={results}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
            <Pagination
              page={page}
              totalPages={data.info.pages}
              onChange={(next) => {
                updateParams({ pagina: next })
                window.scrollTo(0, 0)
              }}
            />
          </>
        )}
      </section>
    </>
  )
}
