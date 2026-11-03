export default function Footer({ onOpenNewsletter }: { onOpenNewsletter: () => void }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Datos de{' '}
          <a className="font-bold underline" href="https://rickandmortyapi.com">
            The Rick and Morty API
          </a>
        </p>
        <button
          type="button"
          onClick={onOpenNewsletter}
          className="cursor-pointer self-start font-bold underline sm:self-auto"
        >
          Boletín interdimensional
        </button>
      </div>
    </footer>
  )
}
