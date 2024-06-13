/**
 * Interfacing ARTICLE BACKEND managing
 * article queries. 
 */

import { APIQueryIntent, APIResponseStatus } from "../../enum/interface-signals.enum";
import { ArticleQueryResponse } from "../../type/article.type";

export class ArticleAPI {
    private static instance: ArticleAPI;
    private static newsFeedPages: number = 1;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new ArticleAPI();
    }

    public static fetchNewsFeed(nextPage: boolean): Promise<ArticleQueryResponse> {
        return nextPage
            ? new Promise(resolve => { })
            : new Promise(resolve => {
                setTimeout(() => {
                    /* Return mock articles */
                    resolve({
                        intent: 'article-query' as APIQueryIntent,
                        status: 'ok' as APIResponseStatus,
                        data: [
                            {
                                title: 'mock article',
                                text: 'Text of a mock article, this is somekinda lorem ipsum of a sort, or whatever...',
                                game_date: 2412,
                                real_date: '2024-06-13',
                                author_id: 1,
                                article_id: 'article-01',
                                labels: ['label1', 'és kettő', 'three']
                            },
                            {
                                title: 'This is an article',
                                text: 'Text of a mock article, this is somekinda lorem ipsum of a sort, or whatever...',
                                game_date: 2311,
                                real_date: '2024-06-13',
                                author_id: 1,
                                article_id: 'article-02',
                                labels: ['labello']
                            }
                        ]
                    });
                }, 100);
            });
    }
}