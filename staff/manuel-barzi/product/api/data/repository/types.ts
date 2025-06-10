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
}