import { buttonSecondary } from '../utils/styles'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        className={buttonSecondary}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Anterior
      </button>
      <span className="font-bold" aria-current="page">
        {page} de {totalPages}
      </span>
      <button
        type="button"
        className={buttonSecondary}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Siguiente
      </button>
    </nav>
  )
}
