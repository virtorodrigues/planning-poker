export type CardToChooseProps = {
  active: boolean;
  score: number;
  handleActiveCard: (score: number) => void;
}

export type CardUserProps = {
  status?: 'showed' | 'active' | 'initial';
  score: number;
}