export interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonDetailsResponse {
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

export interface TypeResponse {
  pokemon: {
    pokemon: {
      name: string
      url: string
    }
  }[]
}

export interface PokemonDetails {
  name: string
  imageUrl: string
}
