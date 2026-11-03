// La API responde en ingles: estos mapas traducen lo que se muestra en pantalla.
const STATUS: Record<string, string> = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' }
const GENDER: Record<string, string> = {
  Male: 'Masculino',
  Female: 'Femenino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
}
const SPECIES: Record<string, string> = {
  Human: 'Humano',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  Disease: 'Enfermedad',
  'Mythological Creature': 'Criatura mitológica',
  unknown: 'Desconocida',
}

export const statusLabel = (value: string) => STATUS[value] ?? value
export const genderLabel = (value: string) => GENDER[value] ?? value
export const speciesLabel = (value: string) => SPECIES[value] ?? value
export const placeLabel = (value: string) => (value === 'unknown' ? 'Desconocido' : value)
