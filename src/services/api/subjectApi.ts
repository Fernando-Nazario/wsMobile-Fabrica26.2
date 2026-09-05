import { Subject } from "@/src/types/subject";
import { ApiError, ErrorHttpStatus } from "@/src/types/apiErrors";
import { readToken } from "../storage/tokenStorage";
import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { getErrorType } from "../utils/getErrorType";

export async function getSubjects() : Promise<Subject[]> {
    const accessToken = await readToken();

    if(!accessToken) {
        const error : ApiError = {
            status: ErrorHttpStatus.UNAUTHORIZED,
            message: "Token does not exist"
        };

        throw error;
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
        throw getErrorType(error);
    }
}

export async function getSingleSubject(id : string) : Promise<Subject> {
    const accessToken = await readToken();

    if(!accessToken) {
        const error : ApiError = {
            status: ErrorHttpStatus.UNAUTHORIZED,
            message: "Token does not exist"
        };

        throw error;
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
        throw getErrorType(error);
    }
}
