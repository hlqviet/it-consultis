import { useMemo, useState } from 'react'

import useGetPokemonDetailsQuery from '../../hooks/useGetPokemonDetailsQuery'
import useGetPokemonsQuery from '../../hooks/useGetPokemonsQuery'
import useGetTypesQuery from '../../hooks/useGetTypesQuery'
import { PER_PAGE_ITEMS } from '../../lib/constants'
import Button from '../Button'
import PokemonCard from '../PokemonCard'
import Tag from '../Tag'

const App = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const { loading: loadingTypes, data: types } = useGetTypesQuery()
  const { loading: loadingPokemons, data: pokemons } = useGetPokemonsQuery({
    types: selectedTypes
  })

  const paginatedPokemons = useMemo(
    () =>
      pokemons.slice(
        page * PER_PAGE_ITEMS,
        page * PER_PAGE_ITEMS + PER_PAGE_ITEMS
      ),
    [page, pokemons]
  )

  const { loading: loadingPokemonDetails, data: pokemonDetails } =
    useGetPokemonDetailsQuery({
      pokemons: paginatedPokemons
    })

  const handleTypeClick = (type: string) => {
    setPage(0)

    if (selectedTypes.includes(type)) {
      setSelectedTypes((prevState) =>
        prevState.filter((_type) => _type !== type)
      )
      return
    }

    setSelectedTypes((prevState) => [...prevState, type])
  }

  const handlePrevClick = () => setPage((prevState) => prevState - 1)

  const handleNextClick = () => setPage((prevState) => prevState + 1)

  return (
    <div>
      <div className='mx-auto max-w-screen-xl'>
        <div className='flex items-center mx-4 my-4'>
          <div className='mr-2 my-4 font-bold self-start'>Types:</div>
          {loadingTypes && <div className='loading loading-spinner' />}

          {!loadingTypes && (
            <div>
              {types.map((type) => (
                <Tag
                  key={type}
                  active={selectedTypes.includes(type)}
                  onClick={() => handleTypeClick(type)}
                >
                  {type}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {!loadingPokemons && (
          <div className='my-12 mx-4 font-bold'>
            {pokemons.length} results found.
          </div>
        )}
      </div>

      {loadingPokemonDetails && (
        <div className='text-center'>
          <div className='loading loading-lg loading-spinner' />
        </div>
      )}

      {!loadingPokemonDetails && (
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
          {pokemonDetails.map((details) => (
            <PokemonCard key={details.name} {...details} />
          ))}
        </div>
      )}

      <div className='mt-8 flex justify-center'>
        <Button
          disabled={loadingPokemons || loadingPokemonDetails || page === 0}
          onClick={handlePrevClick}
        >
          Prev
        </Button>
        <Button
          disabled={
            loadingPokemons ||
            loadingPokemonDetails ||
            page * PER_PAGE_ITEMS + PER_PAGE_ITEMS >= pokemons.length
          }
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default App
