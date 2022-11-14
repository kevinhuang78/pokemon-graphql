import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Pokemon as PokemonType } from '../types/Pokemon';
import { toCapitalize } from '../utils/string';

const HORIZONTAL_MARGIN = 10;

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: calc(25% - ${HORIZONTAL_MARGIN * 2}px);
  cursor: pointer;
  padding: 20px 0;
  margin: 15px ${HORIZONTAL_MARGIN}px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 15px;
  color: #000;
  text-decoration: none;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Name = styled.h2`
  width: 100%;
  margin: 0;
  text-align: center;
`;

const WeightAndHeight = styled.h3`
  width: 100%;
  font-weight: normal;
  margin: 0;
  text-align: center;
`;

const TypesContainer = styled.span`
  text-align: center;
  width: 100%;
`;

export type PokemonCard = Pick<PokemonType,
  'baseStats'
  | 'height'
  | 'key'
  | 'sprite'
  | 'types'
  | 'weight'
>;

type PokemonProps = {
  pokemon: PokemonCard;
};

const Pokemon = ({ pokemon }: PokemonProps) => {
  const { key, sprite, height, weight, types } = pokemon;
  const name = toCapitalize(key);

  return (
    <Container to={`/pokemon/${key}`}>
      <ImageContainer>
        <img src={sprite} alt={name} />
      </ImageContainer>
      <InfoContainer>
        <Name>{name}</Name>
        <WeightAndHeight>
          {`Height: ${height} and weight: ${weight}`}
        </WeightAndHeight>
        <TypesContainer>
          {types.map((type) => type.name).join(', ')}
        </TypesContainer>
      </InfoContainer>
    </Container>
  );
};

export default Pokemon;
