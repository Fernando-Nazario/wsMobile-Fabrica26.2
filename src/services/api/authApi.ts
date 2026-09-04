import { AuthResponse } from "@/src/types/authResponse";
import { Credentials } from "@/src/types/credentials";
import axios from "axios";
import { saveToken, readToken } from "../storage/tokenStorage";
import { User } from "@/src/types/user";
import { BASE_URL } from "./baseUrl";

export async function auth(credentials: Credentials) : Promise<AuthResponse> {
    const END_POINT = "/auth/login";

    try {
        const response = await axios.post<AuthResponse>(`${BASE_URL}${END_POINT}`, credentials);

        await saveToken(response.data.accessToken);

        return response.data;
    } catch(error) {
        if(axios.isAxiosError(error)) {
            console.error("Request error:", error.response?.status ?? error.message);
        }
        throw error;
    }
}

export async function validateAccess() : Promise<string> {
    const accessToken = await readToken();

    if(!accessToken) {
        throw new Error("Access Token does not exist")
    }

    const END_POINT = "/auth/me"

    try {
        await axios.get<User>(`${BASE_URL}${END_POINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return accessToken;
    } catch(error) {
        if(axios.isAxiosError(error)) {
            console.error("Token is not valid:", error.response?.status ?? error.message);
        }
        throw error;
    }
}
