type Ability = {
  key: string;
  name: string;
  description?: string;
};

export type Pokemon = {
  key: string;
  sprite: string;
  shinySprite: string;
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    specialattack: number;
    specialdefense: number;
    speed: number;
  };
  height: number;
  weight: number;
  types: { name: string; }[];
  abilities: {
    first: Ability;
    hidden: Ability | null;
    second: Ability | null;
    special: Ability | null;
  };
  species: string;
  evolutionLevel: string;
  evolutions: Pick<Pokemon, 'key' | 'sprite'>[] | null;
  preevolutions: Pick<Pokemon, 'key' | 'sprite'>[] | null;
};
