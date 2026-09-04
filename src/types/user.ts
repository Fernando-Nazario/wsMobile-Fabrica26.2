type Role = "student" | "professor";

export interface User {
    id: string,
    name: string,
    email: string,
    role: Role
}