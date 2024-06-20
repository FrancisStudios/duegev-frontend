type LanguageModel = {
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
    UNSUCCESSFUL_LOGIN_MSG: string
}

enum ValidLanguages {
    DYNARI = 'dn',
    ENGLISH = 'en',
    HUNGARIAN = 'hu',
}

export type {
    LanguageModel,
    ValidLanguages
}