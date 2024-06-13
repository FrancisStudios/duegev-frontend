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
    LOGIN_MGMT_DISCLAIMER: string
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