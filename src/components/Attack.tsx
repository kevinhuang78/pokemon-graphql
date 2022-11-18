
import { useCallback } from 'react';
import styled from 'styled-components';

import { Ability } from '../types/Pokemon';

const Item = styled.div<{
  $isClickable: boolean;
}>`
  width: 50%;

  cursor: ${({ $isClickable }) => $isClickable ? 'pointer' : 'default'};
`;

const AttackName = styled.span<{
  $isSelected: boolean;
}>`
  margin-left: 15px;
  font-weight: 700;
  font-size: 25px;

  color: ${({ $isSelected }) => $isSelected ? '#9790B7' : '#000'};
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
      onClick={isClickable ? onClick : undefined}
    >
      <AttackName $isSelected={isSelected}>{ability?.name || '-'}</AttackName>
    </Item>
  );
};

export default Attack;
