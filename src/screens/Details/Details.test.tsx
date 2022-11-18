import { MockedResponse } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GraphQLError } from 'graphql';
import Router from 'react-router-dom';

import { GET } from '../../graphql/Pokemon.graphql';
import { renderScreen } from '../../tests/utils';

import Details from './Details';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedUseNavigate,
}));

const mockedPokemon = {
  key: 'charmeleon',
  sprite: 'https://play.pokemonshowdown.com/sprites/ani/charmeleon.gif',
  height: 1.1,
  weight: 19,
  types: [{ name: 'Fire' }],
  baseStats: {
    attack: 64,
    defense: 58,
    specialattack: 80,
    specialdefense: 65,
    speed: 80,
  },
  evolutionLevel: "16",
  evolutions: [
    {
      key: 'charizard',
      sprite: 'https://play.pokemonshowdown.com/sprites/ani/charizard.gif',
    }
  ],
  abilities: {
    first: {
      key: 'blaze',
      name: 'Blaze',
      desc: 'When this Pokémon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.',
    },
    second: null,
    hidden: {
      desc: "If Sunny Day is active, this Pokémon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn. If this Pokémon is holding Utility Umbrella, its Special Attack remains the same and it does not lose any HP.",
      key: 'solarpower',
      name: 'Solar Power',
    },
    special: null,
  },
};
const successGraphQLMock = [{
  request: {
    query: GET,
    variables: { pokemon: 'charmeleon' },
  },
  result: { data: { getPokemon: mockedPokemon } },
}];

type RenderParams = {
  graphQLMocks?: ReadonlyArray<MockedResponse>;
};

const render = ({
  graphQLMocks,
}: RenderParams) => renderScreen({
  screen: <Details />,
  graphQLMocks,
});

const isModalContentVisible = (isVisible: boolean) => {
  if (isVisible) {
    expect(screen.getByText('Charmeleon')).toBeVisible();
    expect(screen.getByText('Types: Fire')).toBeVisible();
    expect(screen.getByText('Weight: 19')).toBeVisible();
    expect(screen.getByText('Height: 1.1')).toBeVisible();
    expect(screen.getByText('Stats:')).toBeVisible();
    expect(screen.getByText('Attack: 64')).toBeVisible();
    expect(screen.getByText('Defense: 58')).toBeVisible();
    expect(screen.getByText('Special Attack: 80')).toBeVisible();
    expect(screen.getByText('Special Defense: 65')).toBeVisible();
    expect(screen.getByText('Speed: 80')).toBeVisible();
    expect(screen.getByText('Evolution at level 16')).toBeVisible();
    expect(screen.getByText('Evolutions')).toBeVisible();
    expect(screen.getByRole('img', { name: 'Charizard' })).toBeVisible();
    expect(screen.getByText('Charizard')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();
  } else {
    expect(screen.getByText('Charmeleon')).not.toBeVisible();
    expect(screen.getByText('Types: Fire')).not.toBeVisible();
    expect(screen.getByText('Weight: 19')).not.toBeVisible();
    expect(screen.getByText('Height: 1.1')).not.toBeVisible();
    expect(screen.getByText('Stats:')).not.toBeVisible();
    expect(screen.getByText('Attack: 64')).not.toBeVisible();
    expect(screen.getByText('Defense: 58')).not.toBeVisible();
    expect(screen.getByText('Special Attack: 80')).not.toBeVisible();
    expect(screen.getByText('Special Defense: 65')).not.toBeVisible();
    expect(screen.getByText('Speed: 80')).not.toBeVisible();
    expect(screen.getByText('Evolution at level 16')).not.toBeVisible();
    expect(screen.getByText('Evolutions')).not.toBeVisible();
    expect(screen.getByText('Charizard')).not.toBeVisible();
    expect(screen.getByText('Close')).not.toBeVisible();
  }
};

describe('Details screen', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ pokemonKey: 'charmeleon' });
  });

  it('renders correctly', async () => {
    render({ graphQLMocks: successGraphQLMock });

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'Charmeleon' })).toBeInTheDocument();
    expect(screen.getByText('Blaze')).toBeInTheDocument();
    expect(screen.getByText('Solar Power')).toBeInTheDocument();
    // 2 abilities to null
    expect(screen.getAllByText('-')).toHaveLength(2);
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Stats')).toBeInTheDocument();
    // Modal of stats
    isModalContentVisible(false);
  });

  it('clicks on an ability will show its description', async () => {
    render({ graphQLMocks: successGraphQLMock });

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'Charmeleon' })).toBeInTheDocument();

    expect(screen.getByText('Blaze')).toHaveStyle({ color: '#000' });
    expect(screen.queryByText('When this Pokémon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Blaze'));

    expect(screen.getByText('Blaze')).toHaveStyle({ color: '#9790B7' });
    expect(screen.getByText('When this Pokémon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.')).toBeInTheDocument();
  });

  it('clicks on "Stats" button opens the modal with additional info and "Close" button will close it', async () => {
    render({ graphQLMocks: successGraphQLMock });

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'Charmeleon' })).toBeInTheDocument();

    isModalContentVisible(false);

    userEvent.click(screen.getByText('Stats'));

    isModalContentVisible(true);

    userEvent.click(screen.getByRole('button', { name: 'Close' }));

    isModalContentVisible(false);
  });

  it('clicks on "Back" button will go back to previous screen', async () => {
    render({ graphQLMocks: successGraphQLMock });

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'Charmeleon' })).toBeInTheDocument();

    userEvent.click(screen.getByText('Back'));

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });

  it('shows error correctly', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ pokemonKey: 'aaa' });
    render({
      graphQLMocks: [{
        request: {
          query: GET,
          variables: { pokemon: 'aaa' },
        },
        error: new GraphQLError('An error occurred'),
      }]
    });

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText("Error: An error occurred")).toBeInTheDocument();
  });
});
