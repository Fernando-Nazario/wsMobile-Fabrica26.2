import { User } from "./user"

export interface AuthResponse {
    accessToken: string,
    tokenType: "Bearer",
    expiresIn: number,
    user: User
}
