import { IUser } from './user';

export interface IPost {
  id: number;
  title: string;
  text: string;
  points: number;
  voteStatus?: number;
  creator?: IUser;
  creatorId?: number;
  createdAt?: string;
  updatedAt?: string;
}
