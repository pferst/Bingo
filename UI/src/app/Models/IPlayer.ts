import {IText} from "./IText";

export interface IPlayer {
  id?: number;
  name: string;
  points?: number;
  position?: number;
  gameId: number;
  texts?: IText[];
  voteKick?: boolean;
  voted?: boolean;
}
