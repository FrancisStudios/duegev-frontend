import { SHA512String, UserAuthenticationResponse } from "../type/user-data.type";
import { DuegevEncryptor } from "../util/encryptor.util";
import { API } from "./API/API";

/**
 * Local user management. Everything
 * related to logged in user control.
 */
class User {
    private static instance: User;

    private constructor() { }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new User();
        return this.instance;
    }

    public static attemptAuthentication(username: string, password: SHA512String): Promise<UserAuthenticationResponse> {
        return API.authenticate(username, password);
    }
}

export default User;