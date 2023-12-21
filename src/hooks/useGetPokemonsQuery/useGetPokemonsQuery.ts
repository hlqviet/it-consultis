import { useEffect, useState } from 'react'

import { getPokemons } from './helpers'

interface UseGetPokemonsQueryProps {
  types: string[]
}

const useGetPokemonsQuery = (props: UseGetPokemonsQueryProps) => {
  const { types } = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const pokemons = await getPokemons(types)

        setData(pokemons)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [types])

  return { loading, data }
}

export default useGetPokemonsQuery
