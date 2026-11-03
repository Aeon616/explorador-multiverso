import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { Character } from '../types'
import { characterUrl } from '../utils/api'
import { buttonPrimary } from '../utils/styles'

const POSITIONS = [
  'left-1/2 top-[8%] size-[44%] -translate-x-1/2',
  'left-[6%] bottom-[10%] size-[38%]',
  'right-[6%] bottom-[10%] size-[38%]',
]

export default function Home() {
  // Los retratos del portal tambien vienen de la API (endpoint de varios IDs).
  const { data } = useFetch<Character[]>(characterUrl('1,2,3'))

  return (
    <section className="flex flex-1 items-center overflow-hidden bg-space text-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl">
            Busca a cualquiera en el multiverso
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/85">
            Encuentra personajes de Rick and Morty, revisa su ficha y guarda a tus favoritos.
          </p>
          <Link to="/explorar" className={`${buttonPrimary} mt-8 px-7 py-3.5 text-lg`}>
            Explorar personajes
          </Link>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-portal rounded-[47%_53%_50%_50%/52%_46%_54%_48%] bg-[conic-gradient(#97ce4c,#e4f7a1,#3f8f3a,#c6ec6e,#2f7a33,#e4f7a1,#97ce4c)] blur-[3px] motion-reduce:animate-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[14%] rounded-full bg-[radial-gradient(#f3ffd0,#97ce4c_70%,transparent)]"
          />
          {data?.map((character, index) => (
            <img
              key={character.id}
              src={character.image}
              alt={`Retrato de ${character.name}`}
              className={`absolute rounded-full border-4 border-ink object-cover ${POSITIONS[index]}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
