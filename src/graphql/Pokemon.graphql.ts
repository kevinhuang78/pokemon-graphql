import gql from 'graphql-tag';

export const GET_ALL = gql`
  query GetPokemons($offset: Int!, $take: Int!) {
    getAllPokemon(offset: $offset, take: $take) {
      key
      sprite
      height
      weight
      types {
        name
      }
    }
  } 
`;

export const GET = gql`
  query GetPokemon($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      key
      sprite
      height
      weight
      types {
        name
      }
      evolutionLevel
      evolutions {
        key
        sprite
      }
      abilities {
        first {
          key
          name
          desc
        }
        second {
          desc
          key
          name
        }
        hidden {
          desc
          key
          name
        }
        special {
          desc
          name
          key
        }
      }
    }
  }
`;
