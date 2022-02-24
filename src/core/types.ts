import { ParsedUrlQuery } from 'querystring';

export type CardToChooseProps = {
  active: boolean;
  score: number;
  handleActiveCard: (score: number) => void;
}

export type CardUserProps = {
  status?: 'showed' | 'active' | 'initial';
  score: number;
}

export type RoomKeyProp = ParsedUrlQuery & {
  roomKey: string;
  isFirstAccessParam: boolean;
};

export type UserProps = {
  key: string;
  name: string;
  admin: boolean;
  score: number;
  status: string;
}

export type DataRoomProps = {
  title: string;
  users: UserProps[];
  active: boolean;
  status: string;
};