import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  children?: ReactNode
}

export default function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <span aria-hidden="true" className="text-6xl text-ink/25">
        ★
      </span>
      <p className="font-display text-2xl font-extrabold">{title}</p>
      {children}
    </div>
  )
}
