/**
 * ====== Interface Layer  =======
 * Please do not access /API/...(.tsx)
 * files directly. Please use this class
 * as the MIF. =()= gracias uwu
 */

import { ArticleQueryResponse } from "../../type/article.type";
import { ArticleAPI } from "./article.api";

export class API {
    private static instance: API;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new API();
    }

    public static getNewsFeed(next: boolean = false) : Promise<ArticleQueryResponse> {
        return ArticleAPI.fetchNewsFeed(next);
    }
}