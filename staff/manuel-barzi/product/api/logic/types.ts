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

export type GetUserInfo = (userId: string) => Promise<User>;

export type FindUsers = (userId: string, query: string, sortField: "name" | "email" | "username", sortOrder: "asc" | "desc", pageNumber: number, pageSize: number) => Promise<User[]>

export type Logic = {
    registerUser: RegisterUser
    authenticateUser: AuthenticateUser
    getUserInfo: GetUserInfo
    findUsers: FindUsers
}

