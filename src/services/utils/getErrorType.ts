import { ApiError } from "@/src/types/apiErrors";
import {isAxiosError} from "axios"
import { ErrorHttpStatus } from "@/src/types/apiErrors";

export function getErrorType(error : unknown) : ApiError{
    if(isAxiosError(error)) {
        if(error.response) {
            return {
                status: error.response.status,
                message: error.response.data?.message || error.response.statusText || `Request failed with status ${error.response.status}`
            }
        } else {
            return {
                status: ErrorHttpStatus.NO_RESPONSE,
                message: "Connection Error"
            }
        }
    } else {
        return {
            status: ErrorHttpStatus.UNKNOWN,
            message: "Unknown Error"
        }
    }
}