# Multiverso

Explorador de personajes de Rick and Morty. Proyecto 01 de Desarrollo de Aplicaciones FrontEnd.

**Stack:** Vite, React, TypeScript, React Router y Tailwind CSS. **API:** [The Rick and Morty API](https://rickandmortyapi.com).

```bash
npm install
npm run dev
```

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Inicio |
| `/explorar` | Lista con búsqueda, filtro y paginación |
| `/explorar/:id` | Detalle del personaje |
| `/favoritos` | Favoritos guardados en estado |
| `/contacto` | Formulario controlado con validación |
| `*` | Página 404 |

## Dónde está cada requisito

| Requisito | Archivo |
| --- | --- |
| Fetch de lista y de detalle | `pages/Explore.tsx`, `pages/Detail.tsx`, `hooks/useFetch.ts` |
| Loading, error y empty | `components/Loader.tsx`, `ErrorMessage.tsx`, `EmptyState.tsx` |
| Búsqueda y filtro en tiempo real | `components/SearchFilters.tsx`, `hooks/useDebounce.ts` |
| Favoritos que persisten entre rutas | Estado en `App.tsx` |
| Formulario y botón disabled | `pages/Contact.tsx`, `components/FormField.tsx` |
| Toast con auto-dismiss | `components/Toast.tsx`, `showToast` en `App.tsx` |
| `<dialog>`, `useRef`, `showModal()` | `components/Modal.tsx`, `ConfirmDialog.tsx` |
| Dark pattern comentado | `components/NewsletterDialog.tsx` |

El modal con dark pattern aparece 4 segundos después del primer favorito, o desde "Boletín interdimensional" en el pie de página.

`vercel.json` redirige todas las rutas a `index.html`, para que recargar `/favoritos` en Vercel no devuelva 404.
