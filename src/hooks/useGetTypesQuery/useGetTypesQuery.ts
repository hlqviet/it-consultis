import { useEffect, useState } from 'react'

import { PaginatedResponse } from '../../lib/types'
import pokedex from '../../utils/pokedex'

const useGetTypesQuery = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const response: PaginatedResponse = await pokedex.getTypesList()
        const types = response.results.map(({ name }) => name)

        setData(types)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(true)
      }
    })()
  }, [])

  return { loading, data }
}

export default useGetTypesQuery
