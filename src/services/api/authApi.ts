import { AuthResponse } from "@/src/types/authResponse";
import { Credentials } from "@/src/types/credentials";
import axios from "axios";
import { saveToken, readToken } from "../storage/tokenStorage";
import { User } from "@/src/types/user";
import { BASE_URL } from "./baseUrl";
import { getErrorType } from "../utils/getErrorType";

export async function auth(credentials: Credentials) : Promise<AuthResponse> {
    const END_POINT = "/auth/login";

    try {
        const response = await axios.post<AuthResponse>(`${BASE_URL}${END_POINT}`, credentials);

        await saveToken(response.data.accessToken);

        return response.data;
    } catch(error) {
        throw getErrorType(error);
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
        throw getErrorType(error);
    }
}

export async function getProfile() : Promise<User> {
    const accessToken = await readToken();

    if(!accessToken) {
        throw new Error("Access Token does not exist")
    }

    const END_POINT = "/auth/me"

    try {
        const user = await axios.get<User>(`${BASE_URL}${END_POINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return user.data;
    } catch(error) {
        throw getErrorType(error);
    }
}
