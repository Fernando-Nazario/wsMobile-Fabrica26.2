import { ApiError } from "@/src/types/apiErrors";
import {isAxiosError} from "axios"
import { ErrorHttpStatus } from "@/src/types/apiErrors";

export default function getErrorType(error : unknown) : ApiError{
    if(isAxiosError(error)) {
        if(error.response) {
            return {
                status: error.response.status,
                message: error.response.statusText
            }
        } else {
            return {
                status: ErrorHttpStatus.NO_RESPONSE,
                message: "Conection Error"
            }
        }
    } else {
        return {
            status: ErrorHttpStatus.UNKNOWN,
            message: "Unknown Error"
        }
    }
}