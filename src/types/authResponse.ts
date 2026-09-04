import { User } from "./user"

export interface AuthResponse {
    accessToken: string,
    tokenType: string,
    expiresIn: number,
    user: User
}
