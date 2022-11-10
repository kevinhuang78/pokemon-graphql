import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import Pokemon from '../components/Pokemon';
import { GET_ALL } from '../graphql/Pokemon.graphql';
import { Pokemon as PokemonType } from '../types/Pokemon';
import Page from '../components/Page';

const NUMBER_OF_POKEMON_PER_PAGE = 300;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  text-align: center;
  width: 100%;
`;

const PokemonsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * NUMBER_OF_POKEMON_PER_PAGE;
  const { data, loading: isLoading, error } = useQuery(GET_ALL, {
    variables: { offset, take: NUMBER_OF_POKEMON_PER_PAGE },
  });

  if (error) return <div>API Error !</div>;

  return (
    <Container>
      <Title>Pokédex</Title>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <PokemonsList>
            {data?.getAllPokemon?.map(
              (pokemon: PokemonType) => <Pokemon key={pokemon.key} pokemon={pokemon} />
            )}
          </PokemonsList>
          <Pagination>
            {[1, 2, 3, 4, 5].map((number) => (
              <Page key={number} activePage={page} pageNumber={number} onPress={setPage} />
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default Home;
