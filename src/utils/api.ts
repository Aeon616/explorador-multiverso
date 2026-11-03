const BASE_URL = 'https://rickandmortyapi.com/api/character'

export function characterListUrl(name: string, status: string, page: number): string {
  const params = new URLSearchParams()
  if (name) params.set('name', name)
  if (status) params.set('status', status)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${BASE_URL}?${query}` : BASE_URL
}

export function characterUrl(id: string | number): string {
  return `${BASE_URL}/${id}`
}
