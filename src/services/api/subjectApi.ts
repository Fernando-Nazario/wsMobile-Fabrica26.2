import { Subject } from "@/src/types/subject";
import { readToken } from "../storage/tokenStorage";
import axios from "axios";
import { BASE_URL } from "./baseUrl";

export async function getSubjects() : Promise<Subject[]> {
    const accessToken = await readToken();

    if(!accessToken) {
        throw new Error("Token does not exist");
    }

    const END_POINT = "/subjects"

    try {
        const response = await axios.get<Subject[]>(`${BASE_URL}${END_POINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch(error) {
        if(axios.isAxiosError(error)) {
            console.error("Failed to retrieve subjects:", error.response?.status ?? error.message);
        }
        throw error;
    }
}

export async function getSingleSubject(id : string) : Promise<Subject> {
    const accessToken = await readToken();

    if(!accessToken) {
        throw new Error("Token does not exist");
    }
    
    const END_POINT = `/subjects/${encodeURIComponent(id)}`;

    try {
        const response = await axios.get<Subject>(`${BASE_URL}${END_POINT}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch(error) {
        if(axios.isAxiosError(error)) {
            console.error("Failed to retrieve single subject:", error.response?.status ?? error.message);
        }
        throw error;
    }
}
