import { APIQueryIntent, APIResponseStatus } from "../enum/interface-signals.enum";

export type Article = {
    title: string,
    text: string,
    game_date: number,
    real_date: string,
    author_id: number,
    article_id: string,
    labels: Array<ArticleLabels>
}

export type ArticleQueryResponse = {
    intent: APIQueryIntent,
    status: APIResponseStatus,
    data: Array<Article>
}

export type ArticleLabels = string;