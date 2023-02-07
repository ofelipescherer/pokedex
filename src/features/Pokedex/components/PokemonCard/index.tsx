import axios from 'axios'
import { usePokemonDetailContext } from 'context/pokemonDetail.context'
import React from 'react'
import { NamedAPIType } from 'types/Pokemon/Common'
import { getIDByURL } from 'util/functions'
import * as S from './styles'

type PokemonCardProps = {
  pokemon: NamedAPIType
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isHovering, setIsHovered] = React.useState(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  const { setPokemonDetail } = usePokemonDetailContext()

  const savePokemonDetail = (pokemon: NamedAPIType) => {
    try {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${getIDByURL(pokemon.url)}/`)
        .then((response) => {
          setPokemonDetail(response.data)
        })
        .catch(() => console.log('Não possível carregar o pokemonCard'))
    } catch (err) {
      console.log('error')
    }
  }

  return (
    <S.Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => savePokemonDetail(pokemon)}
    >
      <S.Header>
        <span>{pokemon.name}</span>
        <S.Number>#{String(getIDByURL(pokemon.url)).padStart(5, '0')}</S.Number>
      </S.Header>
      {isHovering ? (
        <S.PokeImage
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${getIDByURL(
            pokemon?.url
          )}.gif`}
          width={96}
          height={96}
          alt={pokemon.name}
        />
      ) : (
        <S.PokeImage
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDByURL(
            pokemon?.url
          )}.png`}
          width={96}
          height={96}
          alt={pokemon.name}
        />
      )}
    </S.Wrapper>
  )
}
