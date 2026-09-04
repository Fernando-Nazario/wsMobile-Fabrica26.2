export enum ErrorHttpStatus {
    "BAD_REQUEST" = 400,
    "UNAUTHORIZED" = 401,
    "NOT_FOUND" = 404,
    "INTERNAL_SERVER_ERROR" = 500,
    "NO_RESPONSE" = -1,
    "UNKNOWN" = -2
}

export interface ApiError {
    status: ErrorHttpStatus,
    message: string
}