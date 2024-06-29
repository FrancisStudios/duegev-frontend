export enum DuegevAPIIntents {
    AUTHENTICATE_USER = 'authenticate_user', /* For login or other auth */
    CREATE_USER = 'create_user', /* For creating a new user */
    GET_USER_BY_ID = 'get_user_by_id', /* Get a user by ID (non-sensitive) */
    GET_ALL_USERS = 'get_all_users', /* Getting all users (non-sensitive) */
    UPDATE_USER = 'update_user', /* Updating user data in DB */
    DELTE_USER = 'delete_user', /* Removing user from DB (sudo only) */
    GET_ALL_LABELS = 'get_all_labels',
    CREATE_LABEL = 'create_label',
    DELETE_LABEL = 'delete_label',
    UPDATE_LABEL = 'update_label'
}

/* These are the responses you can get in 'message' field */
export enum DuegevAPIResponseMessage {
    OK = 'ok', /* Query could be properly excuted */
    FAIL = 'fail' /* Invalid query */
}

export enum API_PATH {
    AUTH = '/api/auth',
    LABELS = '/api/label',
}