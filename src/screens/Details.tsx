import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET } from '../graphql/Pokemon.graphql';
import { Pokemon } from '../types/Pokemon';
import { toCapitalize } from '../utils/string';

const Details = () => {
  const { pokemonKey } = useParams();
  const { data, loading: isLoading, error } = useQuery(GET, {
    variables: { pokemon: pokemonKey },
  });

  if (error) return <div>{`${error}`}</div>;

  return (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        data?.getPokemon?.map((pokemon: Pokemon) => (
          <span>{toCapitalize(pokemon.key)}</span>
        ))
      )}
    </div>
  );
};

export default Details;
