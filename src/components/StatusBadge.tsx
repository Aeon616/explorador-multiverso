import { statusLabel } from '../utils/labels'

const DOT: Record<string, string> = {
  Alive: 'bg-portal',
  Dead: 'bg-danger',
  unknown: 'bg-ink/30',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold">
      <span aria-hidden="true" className={`size-2.5 rounded-full border border-ink ${DOT[status]}`} />
      {statusLabel(status)}
    </span>
  )
}
