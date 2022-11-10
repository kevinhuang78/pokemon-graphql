import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import Pokemon from '../components/Pokemon';
import { GET_ALL } from '../graphql/Pokemon.graphql';
import { Pokemon as PokemonType } from '../types/Pokemon';
import Page from '../components/Page';

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
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading: isLoading } = useQuery(GET_ALL, {
    variables: { offset: page - 1, take: 300 },
  });

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
            {[1, 2, 3, 4, 5].map((number) => <Page activePage={page} pageNumber={number} onPress={setPage} />)}
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default Home;
