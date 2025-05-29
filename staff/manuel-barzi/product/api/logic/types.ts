export type RegisterUser = (name: string, email: string, username: string, password: string) => Promise<void>

export type Logic = {
    registerUser: RegisterUser
}