export default function Loader({ label = 'Cargando datos…' }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-20">
      <span
        aria-hidden="true"
        className="size-12 animate-spin rounded-full border-5 border-ink/20 border-t-portal motion-reduce:animate-none"
      />
      <p className="font-bold text-muted">{label}</p>
    </div>
  )
}
