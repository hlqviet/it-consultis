import { PokemonDetails } from '../../lib/types'

const PokemonCard = (props: PokemonDetails) => {
  const { imageUrl, name } = props

  return (
    <div>
      <div className='h-24 w-24 mx-auto'>
        <img
          alt={name}
          loading='lazy'
          src={imageUrl}
          title={name}
          width={100}
          height={100}
        />
      </div>
      <div className='text-center'>{name}</div>
    </div>
  )
}

export default PokemonCard
