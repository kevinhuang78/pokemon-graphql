
import { useCallback } from 'react';
import styled from 'styled-components';

import { Ability } from '../types/Pokemon';

const Item = styled.div<{
  $isClickable: boolean;
  $isSelected: boolean;
}>`
  width: 50%;

  cursor: ${({ $isClickable }) => $isClickable ? 'pointer' : 'default'};
  color: ${({ $isSelected }) => $isSelected ? '#9790B7' : '#000'};
`;

const AttackName = styled.span`
  margin-left: 15px;
  font-weight: 700;
  font-size: 25px;
`;

type AttackProps = {
  ability: Ability | null;
  onPress: (abilityKey: Ability) => void;
  isSelected: boolean;
}

const Attack = ({ ability, onPress, isSelected }: AttackProps) => {
  const isClickable = !!ability;
  const onClick = useCallback(() => {
    onPress(ability!);
  }, [ability, onPress]);

  return (
    <Item
      $isClickable={isClickable}
      $isSelected={isSelected}
      onClick={isClickable ? onClick : undefined}
    >
      <AttackName>{ability?.name || '-'}</AttackName>
    </Item>
  );
};

export default Attack;
