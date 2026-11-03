interface SearchFiltersProps {
  name: string
  status: string
  onNameChange: (value: string) => void
  onStatusChange: (value: string) => void
}

const fieldStyles =
  'w-full rounded-xl border-2 border-ink bg-white px-4 py-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink'

export default function SearchFilters({
  name,
  status,
  onNameChange,
  onStatusChange,
}: SearchFiltersProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="grid gap-3 sm:grid-cols-[1fr_14rem]"
    >
      <div>
        <label htmlFor="search-name" className="mb-1 block text-sm font-bold">
          Buscar por nombre
        </label>
        <input
          id="search-name"
          type="search"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Ej: Morty"
          className={fieldStyles}
        />
      </div>
      <div>
        <label htmlFor="search-status" className="mb-1 block text-sm font-bold">
          Estado
        </label>
        <select
          id="search-status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={fieldStyles}
        >
          <option value="">Todos los estados</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
    </form>
  )
}
