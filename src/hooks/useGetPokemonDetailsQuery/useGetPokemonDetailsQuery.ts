import { useEffect, useState } from 'react'

import { PokemonDetails, PokemonDetailsResponse } from '../../lib/types'
import pokedex from '../../utils/pokedex'

interface UseGetPokemonDetailsQueryProps {
  pokemons: string[]
}

const useGetPokemonDetailsQuery = (props: UseGetPokemonDetailsQueryProps) => {
  const { pokemons } = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PokemonDetails[]>([])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const responses: PokemonDetailsResponse[] =
          pokedex.getPokemonByName(pokemons)
        const pokemonDetails: PokemonDetails[] = responses.map(
          ({ name, sprites }) => ({
            name,
            imageUrl: sprites.other['official-artwork'].front_default
          })
        )

        setData(pokemonDetails)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [pokemons])

  return { loading, data }
}

export default useGetPokemonDetailsQuery
