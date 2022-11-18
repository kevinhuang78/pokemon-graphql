import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GraphQLError } from 'graphql';

import { GET_ALL } from '../../graphql/Pokemon.graphql';
import { renderScreen } from '../../tests/utils';

import Home, { NUMBER_OF_POKEMON_PER_PAGE } from './Home';

const mockedPokemonLists = [{
  key: 'charizard',
  sprite: 'https://play.pokemonshowdown.com/sprites/ani/charizard.gif',
  height: 1.7,
  weight: 90.5,
  types: [
    { name: 'Fire' },
    { name: 'Flying' }
  ],
}];
const successGraphQLMock = [{
  request: {
    query: GET_ALL,
    variables: { offset: 0, take: NUMBER_OF_POKEMON_PER_PAGE },
  },
  result: { data: { getAllPokemon: mockedPokemonLists } },
}];

describe('Home screen', () => {
  it('renders correctly', async () => {
    renderScreen({
      screen: <Home />,
      graphQLMocks: successGraphQLMock,
    });

    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Height: 1.7 and weight: 90.5')).toBeInTheDocument();
    expect(screen.getByText('Fire, Flying')).toBeInTheDocument();

    // Pagination
    expect(screen.getByText('1')).toHaveStyle({ color: 'blue' });
    expect(screen.getByText('2')).toHaveStyle({ color: 'black' });
    expect(screen.getByText('3')).toHaveStyle({ color: 'black' });
    expect(screen.getByText('4')).toHaveStyle({ color: 'black' });
    expect(screen.getByText('5')).toHaveStyle({ color: 'black' });
  });

  it('clicks on pagination render different pokemons', async () => {
    renderScreen({
      screen: <Home />,
      graphQLMocks: [
        ...successGraphQLMock,
        {
          request: {
            query: GET_ALL,
            variables: { offset: 300, take: NUMBER_OF_POKEMON_PER_PAGE },
          },
          result: {
            data: {
              getAllPokemon: [{
                key: 'bulbasaur',
                sprite: 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif',
                height: 0.7,
                weight: 6.9,
                types: [{ name: 'Grass' }, { name: 'Poison' }],
              }],
            },
          },
        },
      ],
    });

    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Charizard')).toBeInTheDocument();

    userEvent.click(screen.getByText('2'));

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Height: 0.7 and weight: 6.9')).toBeInTheDocument();
    expect(screen.getByText('Grass, Poison')).toBeInTheDocument();

    // Pagination
    expect(screen.getByText('1')).toHaveStyle({ color: 'black' });
    expect(screen.getByText('2')).toHaveStyle({ color: 'blue' });
    expect(screen.getByText('3')).toHaveStyle({ color: 'black' });
    expect(screen.getByText('4')).toHaveStyle({ color: 'black' });
    expect(screen.getByText('5')).toHaveStyle({ color: 'black' });
  });

  it('redirects to details screen when pressing on Pokemon card', async () => {
  });

  it('shows error correctly', async () => {
    renderScreen({
      screen: <Home />,
      graphQLMocks: [{
        request: {
          query: GET_ALL,
          variables: { offset: 0, take: NUMBER_OF_POKEMON_PER_PAGE },
        },
        error: new GraphQLError('An error occurred'),
      }]
    });

    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText("Error: An error occurred")).toBeInTheDocument();
  });
});
