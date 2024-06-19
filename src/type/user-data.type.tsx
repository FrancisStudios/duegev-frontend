import { UserPrivileges } from "../enum/privileges.enum";
import { DuegevAPIIntents, DuegevAPIResponseMessage } from "../services/API/API.enum";
import { ValidLanguages } from "./language.type";

export type AuthenticationKeys = {
    username: string,
    password: SHA512String
}

export type UserData = {
    uid: number
    auth: AuthenticationKeys,
    playerName: string,
    prefix: string,
    language: ValidLanguages,
    profileImg: string,
    privileges: Array<UserPrivileges>
}


export type UserAuthenticationResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: UserData
}

export type LoginRequest = AuthenticationKeys;
export type SHA512String = string;
