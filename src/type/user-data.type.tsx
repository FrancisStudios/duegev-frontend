import { UserPrivileges } from "../enum/privileges.enum";
import { ValidLanguages } from "./language.type";

export type AuthenticationKeys = {
    username: string,
    password: string
}

export type UserData = {
    auth: AuthenticationKeys,
    playerName: string,
    prefix: string,
    language: ValidLanguages,
    profileImg: string,
    privileges: Array<UserPrivileges>
}

export type LoginRequest = AuthenticationKeys;
