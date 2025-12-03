export interface IUserDoc {
  name: string;
  email: string;
  avatar?: string;
  username: string;
  password: string;
}

export interface IPostDoc {
  userId: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
}
