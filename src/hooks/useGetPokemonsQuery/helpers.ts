import { PaginatedResponse, TypeResponse } from '../../lib/types'
import pokedex from '../../utils/pokedex'

export const getPokemons = async (types: string[]) => {
  if (types.length) return await getPokemonsByTypes(types)

  const response: PaginatedResponse = await pokedex.getPokemonsList()

  return response.results.map(({ name }) => name)
}

export const getPokemonsByTypes = async (types: string[]) => {
  const responses: TypeResponse[] = await pokedex.getTypeByName(types)
  const pokemons: Record<string, number | undefined> = {}

  for (const typePokemons of responses) {
    for (const { pokemon } of typePokemons.pokemon) {
      pokemons[pokemon.name] = (pokemons[pokemon.name] || 0) + 1
    }
  }

  return Object.entries(pokemons).reduce<string[]>((acc, [name, count]) => {
    if (count === responses.length) {
      acc.push(name)
    }

    return acc
  }, [])
}
