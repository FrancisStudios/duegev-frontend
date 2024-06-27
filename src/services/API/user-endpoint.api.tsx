import { UserAuthenticationResponse, UserCreationData, UserCreationQuery, UserData, UserDataChangeQuery } from "../../type/user-data.type";
import { APIConnection } from "./API.connection";
import { API_PATH, DuegevAPIIntents } from "./API.enum";

export class UserEndpoint {
    private static makeRequest(requestData: any): Promise<any> {
        return new Promise(resolve => {
            fetch(`http://${APIConnection.IP}:${APIConnection.PORT}${API_PATH.AUTH}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => { resolve(data) });
        });
    }

    public static changeUser(currentUserObject: UserAuthenticationResponse, NewUserDataConstruct: UserData): Promise<UserAuthenticationResponse> {
        return new Promise((resolve) => {
            const request: UserDataChangeQuery = {
                intent: DuegevAPIIntents.UPDATE_USER,
                query: {
                    currentUserFromLocal: currentUserObject,
                    newUserDataConstruct: NewUserDataConstruct
                }
            }

            this
                .makeRequest(request)
                .then((response) => { resolve(response) });
        });
    }

    public static createUser(userCreationData: UserCreationData): Promise<UserAuthenticationResponse> {
        return new Promise((resolve) => {
            const request: UserCreationQuery = {
                intent: DuegevAPIIntents.CREATE_USER,
                query: {
                    username: userCreationData.username,
                    password: userCreationData.password,
                    session_token: userCreationData.session_token
                }
            }
        });
    }
}