export interface IUserData {
    id: string
    name: string
    email: string
    username: string
    password: string
    avatar?: string
}

export interface IUserRepository {
    save(user: IUserData): Promise<void>
    findByUsername(username: string): Promise<IUserData | null>
    findById(id: string): Promise<IUserData | null>
    removeAll(): Promise<void>
    generateId(): string
    filter(
        criteria: { name?: string, username?: string, email?: string },
        sort: { [key in "name" | "username" | "email"]?: number },
        page: { page: number, size: number }
    ): Promise<IUserData[]>
}

export interface IPostData {
    id: string
    author: string
    image: string
    text: string
    date: Date
}

export interface IPostRepository {
    save(post: IPostData): Promise<void>
    findById(id: string): Promise<IPostData | null>
    removeAll(): Promise<void>
    removeById(id: string): Promise<void>
    generateId(): string
}