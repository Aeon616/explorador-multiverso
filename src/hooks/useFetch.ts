import { useCallback, useEffect, useState } from 'react'

/**
 * Pide una URL cada vez que cambia y expone los estados que necesita la UI.
 * notFound va aparte de error porque esta API responde 404 cuando una busqueda
 * no tiene resultados: eso es un estado vacio, no una falla.
 */
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Cancela la peticion anterior para que una respuesta vieja no pise a la nueva.
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      setNotFound(false)
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (response.status === 404) {
          setData(null)
          setNotFound(true)
          return
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        setData((await response.json()) as T)
      } catch {
        if (controller.signal.aborted) return
        setData(null)
        setError('No se pudo cargar la información.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [url, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  return { data, loading, error, notFound, retry }
}
