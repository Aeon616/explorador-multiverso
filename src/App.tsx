import { useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ConfirmDialog from './components/ConfirmDialog'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import NewsletterDialog from './components/NewsletterDialog'
import ToastContainer from './components/ToastContainer'
import Contact from './pages/Contact'
import Detail from './pages/Detail'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import type { Character, ToastData, ToastType } from './types'

export default function App() {
  // Los favoritos viven aqui, por encima de <Routes>: App no se desmonta al cambiar
  // de ruta, asi que el estado persiste mientras se navega.
  const [favorites, setFavorites] = useState<Character[]>([])
  const [pendingRemoval, setPendingRemoval] = useState<Character | null>(null)
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [newsletterShown, setNewsletterShown] = useState(false)
  const nextToastId = useRef(1)
  const { pathname } = useLocation()

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = nextToastId.current++
    setToasts((current) => [...current, { id, type, message }])
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  function handleToggleFavorite(character: Character) {
    if (favorites.some((favorite) => favorite.id === character.id)) {
      setPendingRemoval(character) // Quitar pide confirmacion; agregar no.
      return
    }
    setFavorites([...favorites, character])
    showToast('success', `${character.name} agregado a favoritos`)
  }

  function confirmRemoval() {
    if (!pendingRemoval) return
    setFavorites(favorites.filter((favorite) => favorite.id !== pendingRemoval.id))
    showToast('info', `${pendingRemoval.name} quitado de favoritos`)
    setPendingRemoval(null)
  }

  // Al navegar, la pagina nueva empieza desde arriba.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // El modal con dark pattern aparece una vez, poco despues del primer favorito.
  const hasFavorites = favorites.length > 0
  useEffect(() => {
    if (!hasFavorites || newsletterShown || pendingRemoval) return
    const timer = setTimeout(() => {
      setNewsletterOpen(true)
      setNewsletterShown(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [hasFavorites, newsletterShown, pendingRemoval])

  const favoriteProps = { favorites, onToggleFavorite: handleToggleFavorite }

  return (
    <div className="flex min-h-screen flex-col bg-coat font-sans text-ink">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-lg focus:bg-morty focus:px-4 focus:py-2 focus:font-bold"
      >
        Saltar al contenido
      </a>
      <Navbar favoriteCount={favorites.length} />

      <main id="contenido" className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explore {...favoriteProps} showToast={showToast} />} />
          <Route path="/explorar/:id" element={<Detail {...favoriteProps} showToast={showToast} />} />
          <Route path="/favoritos" element={<Favorites {...favoriteProps} />} />
          <Route path="/contacto" element={<Contact showToast={showToast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer onOpenNewsletter={() => setNewsletterOpen(true)} />

      <ConfirmDialog
        open={pendingRemoval !== null}
        title="¿Quitar de favoritos?"
        confirmLabel="Quitar"
        danger
        onConfirm={confirmRemoval}
        onCancel={() => setPendingRemoval(null)}
      >
        ¿Seguro que quieres quitar a <strong>{pendingRemoval?.name}</strong> de tus favoritos?
      </ConfirmDialog>

      <NewsletterDialog
        open={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
        showToast={showToast}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
