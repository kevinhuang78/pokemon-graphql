import gql from 'graphql-tag';

export const GET_ALL = gql`
  query pokemons($offset: Int!, $take: Int!) {
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
