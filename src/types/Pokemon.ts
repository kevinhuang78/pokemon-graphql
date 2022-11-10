export type Pokemon = {
  key: string;
  sprite: string;
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
};
