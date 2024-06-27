export type LanguageModel = {
    HOME: string,
    SEARCH: string,
    MAP: string,
    LOGIN: string,
    LOGOUT: string,
    CREATE: string,
    ARTICLES: string,
    SETTINGS: string,
    PRIVILEGES: string,
    LOG_IN: string,
    USERNAME: string,
    PASSWORD: string,
    LOGIN_MGMT_DISCLAIMER: string,
    METADATA_TE: string,
    ARTICLE_TEXT_TE: string,
    PREVIEW_TE: string,
    BACK: string,
    NEXT: string,
    COMPLETE: string,
    RESET: string,
    PUBLISH: string,
    FINISH_TE: string,
    ALL_STEPS_COMPLETED_TE_MSG: string,
    UNSUCCESSFUL_LOGIN_MSG: string,
    SAVE: string,
    CHANGE: string,
    PREFIX: string,
    PLAYER_NAME: string,
    LANGUAGE: string,
    UPLOAD_PROFILE_IMG: string,
    PROFILE_IMG: string,
    DO_YOU_WANT_TO_CHANGE_USER_DATA: string,
    CANCEL: string,
    CONFIRM_WITH_LOGIN:string,
    NEW_PASSWORD: string,
    CONFIRM_YOUR_NEW_PW: string,
    OLD_VALUE: string,
    NEW_VALUE: string,
    PASSWORD_CONFIRM_INVALID: string,
    NEW_PASSWORD_CONFIRM_INV: string,
    INTERNAL_SERVER_ERROR: string,
    SETTINGS_SAVE_SUCCESSFUL: string,
    USER_RECRUITMENT_PANEL: string,
    USER_RECRUITMENT_MESSAGE: string,
    USER_RECRUITMENT_COPY_MESSAGE: string,
    ACKNOWLEDGE_SHARE: string,
    CREATE_USER: string,
    ACKNOWLEDGE_USER: string,
    CREATE_USER_DATA_ENTRY_ERROR: string,
}

export enum ValidLanguages {
    DYNARI = 'dn',
    ENGLISH = 'en',
    HUNGARIAN = 'hu',
}