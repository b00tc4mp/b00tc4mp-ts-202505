export interface User {
    id: string
    name: string
    email: string
    username: string
    password: string
    avatar?: string
}

export type RegisterUser = (name: string, email: string, username: string, password: string) => Promise<void>

export type AuthenticateUser = (username: string, password: string) => Promise<string>

export type GetUserInfo = (id: string) => Promise<User>;

export type FindUsers = (query: string, order: string, page: number, max: number) => Promise<User[]>

export type Logic = {
    registerUser: RegisterUser
    authenticateUser: AuthenticateUser
    getUserInfo: GetUserInfo
    findUsers: FindUsers
}

