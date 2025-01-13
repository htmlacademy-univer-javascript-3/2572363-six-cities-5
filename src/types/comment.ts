import { User } from './user.ts';

export type Comment = {
  comment: string;
  rating: number;
};

export type CommentExtended = Comment & {
  id: string;
  user: User;
  date: Date;
};

export type Comments = CommentExtended[];
