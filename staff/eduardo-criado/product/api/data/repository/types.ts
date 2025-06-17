export interface IUserData {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface IPostData {
  id: string;
  userId: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
}

export interface IUserRepository {
  save(user: IUserData): Promise<void>;
  findByUsername(username: string): Promise<IUserData | null>;
  findById(id: string): Promise<IUserData | null>;
  removeAll(): Promise<void>;
  generateId(): string;
}

export interface IPostRepository {
  save(post: IPostData): Promise<void>;
  findById(id: string): Promise<IPostData | null>;
  findAll(): Promise<IPostData[]>;
  findByUser(userId: string): Promise<IPostData[]>;
  remove(postId: string): Promise<void>;
  generateId(): string;
}
