import {IText} from "./IText";

export interface IPlayer {
  id?: number;
  name: string;
  points: number;
  gameId: number;
  texts: IText[];
}
