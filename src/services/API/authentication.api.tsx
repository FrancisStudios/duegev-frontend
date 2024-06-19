import { UserPrivileges } from "../../enum/privileges.enum";
import { ValidLanguages } from "../../type/language.type";
import { SHA512String, UserAuthenticationQuery, UserAuthenticationResponse } from "../../type/user-data.type";
import { APIConnection } from "./API.connection";
import { API_PATH, DuegevAPIIntents, DuegevAPIResponseMessage } from "./API.enum";

export class AuthenticationAPI {
    private static instance: AuthenticationAPI;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new AuthenticationAPI();
    }

    public static authenticateUser(username: string, password: SHA512String): Promise<UserAuthenticationResponse> {
        return new Promise((resolve, reject) => {
            const request: UserAuthenticationQuery = {
                intent: DuegevAPIIntents.AUTHENTICATE_USER,
                query: {
                    username: username,
                    password: password
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