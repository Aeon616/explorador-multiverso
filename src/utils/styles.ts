// Clases de Tailwind reutilizadas para no repetir los mismos botones (DRY).
const base =
  'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink px-5 py-2.5 font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 cursor-pointer'

export const buttonPrimary = `${base} bg-portal text-ink shadow-hard`
export const buttonSecondary = `${base} bg-white text-ink`
export const buttonDanger = `${base} bg-danger text-white`
