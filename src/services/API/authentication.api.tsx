import { UserPrivileges } from "../../enum/privileges.enum";
import { ValidLanguages } from "../../type/language.type";
import { SHA512String, UserAuthenticationResponse } from "../../type/user-data.type";
import { DuegevAPIIntents, DuegevAPIResponseMessage } from "./API.enum";

export class AuthenticationAPI {
    private static instance: AuthenticationAPI;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new AuthenticationAPI();
    }

    public static authenticateUser(username: string, password: SHA512String): Promise<UserAuthenticationResponse> {
        /* TODO: Returns the BACKEND Response promise ==>> DATA TYPE SHOULDN'T BE USER DATA RATHER A 
        SUPERSET LIKE USER_AUTH_RESPONSE_DATA WHICH CONTAINS AUTHENTICATION OK FLAG */
        console.log(`${username} @ ${password}`);
        return new Promise((resolve, reject) => {
            resolve(
                {
                    intent: DuegevAPIIntents.AUTHENTICATE_USER,
                    message: DuegevAPIResponseMessage.OK,
                    data: {
                        auth: { username: 'francis', password: '$6$duegevlogin$cmVkuGVvOXquU9W2SF6HsXtHXAaYFJfCnii7zsGqzeGHdnWw4oAz/3/Xc51AcS8zxu5V0.nRDumOezymFrg7F0' },
                        playerName: 'Jehem',
                        prefix: 'Supreme Protector',
                        language: 'en' as ValidLanguages,
                        profileImg: 'base64',
                        privileges: [UserPrivileges.SUDO]
                    }
                }
            );
        });
    }
}