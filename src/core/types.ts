export type CardToChooseProps = {
  active: boolean;
  score: number;
  handleActiveCard: (score: number) => void;
}