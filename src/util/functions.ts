import { NamedAPIType, NamesType } from 'types/Pokemon/Common'

export function LightenDarkenColor(col: string, amt: number) {
  let usePound = false

  if (col[0] == '#') {
    col = col.slice(1)
    usePound = true
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export function getBestContrastColor(bgcolor: string) {
  if (!bgcolor) bgcolor = '#ffffff'
  let color = bgcolor.charAt(0) === '#' ? bgcolor.substring(1, 7) : bgcolor
  const r = parseInt(color.substring(0, 2), 16) // hexToR
  const g = parseInt(color.substring(2, 4), 16) // hexToG
  const b = parseInt(color.substring(4, 6), 16) // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186
    ? (color = '#000')
    : (color = '#fff')
}

export function getTranslationName(arr: NamesType[], language: string) {
  const index = arr.findIndex((value) => value.language.name === language)
  return arr[index]
}

export function getIDByURL(url: string) {
  const urlSplitted = url.split('/')
  return urlSplitted[urlSplitted.length - 2]
}

export function filterData(data: NamedAPIType[], filter: string, take: number) {
  if (!filter) return data.slice(0, take)
  else {
    const rg = new RegExp(`^(?=.*\\b${filter}).*$`, 'gmi')
    return data.filter((pokemon: NamedAPIType) => verifyPokemon(pokemon, rg))
  }
}

function verifyPokemon(pokemon: NamedAPIType, rg: RegExp): boolean {
  if (!pokemon) return false
  return Boolean(pokemon?.name.match(rg) || getIDByURL(pokemon?.url).match(rg))
}

export function getRemovedHyphen(name: string) {
  return name.replaceAll('-', ' ')
}
