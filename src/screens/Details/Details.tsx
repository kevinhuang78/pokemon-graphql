import { Fragment, useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { GET } from '../../graphql/Pokemon.graphql';
import { Ability, Pokemon } from '../../types/Pokemon';
import { toCapitalize } from '../../utils/string';
import battleBackground from '../../assets/battle-background.webp';
import Attack from '../../components/Attack';

const attackMenuBorderStyle = css`
  background-color: #FFF;
  border-radius: 15px;
  border: 7px solid #76718F;
`;

const absoluteButtonStyle = css`
  padding: 10px 20px;
  cursor: pointer;
  background: #FFF;
  border-radius: 10px;
`;

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: no-repeat center center url(${battleBackground});
  background-size: cover;
`;

const BackButton = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  ${absoluteButtonStyle}
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40vh;

  @media (min-width: 600px) and (max-width: 899px) {
    padding-top: 20vh;
  }

  @media (min-width: 900px) and (max-width: 1023px) {
    padding-top: 48vh;
  }

  @media (min-width: 1024px) and (max-width: 1199px) {
    padding-top: 42vh;
  }

  @media (min-width: 1200px) {
    padding-top: 45vh;
  }
`;

const Sprite = styled.img`
  height: 200px;
  width: auto;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 200px;
  background-color: #393742;
  flex-wrap: wrap;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

const Attacks = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  ${attackMenuBorderStyle}

  @media (min-width: 1024px) and (max-width: 1199px) {
    width: 70%;
    flex-wrap: nowrap;
  }
`;

const AttackDescriptionContainer = styled.div`
  ${attackMenuBorderStyle}
  width: 100%;
  overflow-y: auto;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    width: 29%;
    margin-left: 1%;
  }
`;

const AttackDescription = styled.span`
  margin: 0 15px;
  font-size: 18px;
`;

const OpenModalButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  ${absoluteButtonStyle}
`;

const Modal = styled.div<{
  $isShown: boolean;
}>`
  position: absolute;
  left: ${({ $isShown }) => $isShown ? '0' : '100%'};
  top: 0;
  z-index: 2;
  visibility: ${({ $isShown }) => $isShown ? 'visible' : 'hidden'};
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background: #FFF;
  transition: all .5s ease-in-out;
`;

const PokemonName = styled.h1`
  text-align: center;
`;

const Details = () => {
  const navigate = useNavigate();
  const [selectedAttack, setSelectedAttack] = useState<Ability | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pokemonKey } = useParams();
  const { data, loading: isLoading, error } = useQuery(GET, {
    variables: { pokemon: pokemonKey },
  });
  const pokemon: Pokemon = data?.getPokemon;

  const onPressBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const switchSprite = useCallback(() => {
    setIsShiny((prev) => !prev);
  }, []);

  if (error) return <div>{`${error}`}</div>;
  if (isLoading) return <span>Loading...</span>;

  const {
    sprite,
    shinySprite,
    key,
    abilities: { first, second, special, hidden },
    evolutionLevel,
    species,
    types,
    weight,
    height,
    baseStats: {
      attack, defense, specialattack, specialdefense, speed,
    },
    evolutions,
    preevolutions,
  } = pokemon;
  const name = toCapitalize(key);

  return (
    <Background>
      <BackButton onClick={onPressBack}>Back</BackButton>
      <OpenModalButton onClick={toggleModal}>Stats</OpenModalButton>
      <Modal $isShown={isModalOpen}>
        <PokemonName>{name}</PokemonName>
        {!!species && <p>{`Species : ${species}`}</p>}
        <p>{`Types: ${types.map(({ name }) => name).join(', ')}`}</p>
        <p>{`Weight: ${weight}`}</p>
        <p>{`Height: ${height}`}</p>
        <p>Stats:</p>
        <ul>
          <li>{`Attack: ${attack}`}</li>
          <li>{`Defense: ${defense}`}</li>
          <li>{`Special Attack: ${specialattack}`}</li>
          <li>{`Special Defense: ${specialdefense}`}</li>
          <li>{`Speed: ${speed}`}</li>
        </ul>
        {!!evolutionLevel && <p>{`Evolution at level ${evolutionLevel}`}</p>}
        {!!evolutions && (
          <div>
            <p>Evolutions</p>
            {evolutions.map((evolution) => (
              <Fragment key={evolution.key}>
                <img src={evolution.sprite} alt={toCapitalize(evolution.key)} />
                <p>{toCapitalize(evolution.key)}</p>
              </Fragment>
            ))}
          </div>
        )}
        {!!preevolutions && (
          <div>
            <p>Pre-evolutions</p>
            {preevolutions.map((preevolution) => (
              <>
                <img src={preevolution.sprite} alt={toCapitalize(preevolution.key)} />
                <p>{toCapitalize(preevolution.key)}</p>
              </>
            ))}
          </div>
        )}
        <button onClick={toggleModal}>Close</button>
      </Modal>
      <ImageContainer>
        <Sprite src={isShiny ? shinySprite : sprite} alt={toCapitalize(name)} onClick={switchSprite} />
      </ImageContainer>
      <Menu>
        <Attacks>
          {[first, second, special, hidden].map((ability, index) => (
            <Attack
              key={ability?.key || index}
              ability={ability}
              onPress={setSelectedAttack}
              isSelected={ability?.key === selectedAttack?.key}
            />
          ))}
        </Attacks>
        <AttackDescriptionContainer>
          {!!selectedAttack && (
            <AttackDescription>{selectedAttack.desc}</AttackDescription>
          )}
        </AttackDescriptionContainer>
      </Menu>
    </Background>
  );
};

export default Details;
