export enum APIQueryIntent {
    ARTICLE_QUERY = 'article-query',
    ARTICLE_CREATE = 'article-create',
    ARTICLE_DELETE = 'article-delete',
    ARTICLE_UPDATE = 'article-update',
    USER_LOGIN = 'user-login',
    USER_CREATE = 'user-create',
    USER_DELETE = 'user-delete',
    USER_UPDATE = 'user-update',
}

export enum APIResponseStatus {
    OK = 'ok',
    FAILED = 'failed'
}