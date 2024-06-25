import { UserAuthenticationResponse, UserData, UserDataChangeQuery } from "../../type/user-data.type";
import { APIConnection } from "./API.connection";
import { API_PATH, DuegevAPIIntents } from "./API.enum";

export class UserEndpoint {
    public static changeUser(currentUserObject: UserAuthenticationResponse, NewUserDataConstruct: UserData): Promise<UserAuthenticationResponse> {
        return new Promise((resolve) => {
            const request: UserDataChangeQuery = {
                intent: DuegevAPIIntents.UPDATE_USER,
                query: {
                    currentUserFromLocal: currentUserObject,
                    newUserDataConstruct: NewUserDataConstruct
                }
            }

            fetch(`http://${APIConnection.IP}:${APIConnection.PORT}${API_PATH.AUTH}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            })
                .then(response => response.json())
                .then(data => { resolve(data) });
        });
    }
}