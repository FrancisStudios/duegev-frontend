export enum DuegevAPIIntents {
    AUTHENTICATE_USER = 'authenticate_user' /* For login or other auth */
}

/* These are the responses you can get in 'message' field */
export enum DuegevAPIResponseMessage {
    OK = 'ok', /* Query could be properly excuted */
    FAIL = 'fail' /* Invalid query */
}