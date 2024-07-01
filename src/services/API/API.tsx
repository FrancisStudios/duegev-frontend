/**
 * ====== Interface Layer  =======
 * Please do not access /API/...(.tsx)
 * files directly. Please use this class
 * as the MIF. =()= gracias uwu
 */

import { ArticleQueryResponse } from "../../type/article.type";
import { Label, LabelQueryResponse } from "../../type/label.type";
import { SHA512String, UserAuthenticationResponse, UserCreationData, UserCreationResponse, UserData } from "../../type/user-data.type";
import { ArticleAPI } from "./article.api";
import { AuthenticationAPI } from "./authentication.api";
import { LabelsEndpoint } from "./labels-endpoint-api";
import { UserEndpoint } from "./user-endpoint.api";

export class API {
    private static instance: API;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new API();
    }

    public static getNewsFeed(next: boolean = false): Promise<ArticleQueryResponse> {
        return ArticleAPI.fetchNewsFeed(next);
    }

    public static authenticate(username: string, password: SHA512String): Promise<UserAuthenticationResponse> {
        return AuthenticationAPI.authenticateUser(username, password);
    }

    public static changeUserData(currentUserObject: UserAuthenticationResponse, NewUserDataConstruct: UserData): Promise<UserAuthenticationResponse> {
        return UserEndpoint.changeUser(currentUserObject, NewUserDataConstruct);
    }

    public static createUser(createUserQuery: UserCreationData): Promise<UserCreationResponse> {
        return UserEndpoint.createUser(createUserQuery);
    }

    public static getAllLabels(): Promise<Label[]> {
        return LabelsEndpoint.getAllLabels();
    }

    public static createLabel(labelData: Label): Promise<LabelQueryResponse> {
        return LabelsEndpoint.createLabel(labelData);
    }

    public static deleteLabel(labelData: Label): Promise<LabelQueryResponse> {
        return LabelsEndpoint.deleteLabel(labelData);
    }
}