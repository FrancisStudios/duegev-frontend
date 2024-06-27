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
    data?: {    /* If failed, no UD */
        user: UserData
        session_token: SHA512String
    }
}

export type UserAuthenticationQuery = {
    intent: DuegevAPIIntents.AUTHENTICATE_USER,
    query: AuthenticationKeys
}

export type UserDataChangeQuery = {
    intent: DuegevAPIIntents.UPDATE_USER,
    query: {
        currentUserFromLocal: UserAuthenticationResponse,
        newUserDataConstruct: UserData
    }
}

export type UserCreationQuery = {
    intent: DuegevAPIIntents.CREATE_USER,
    query: UserCreationData
}

export type UserCreationData = {
    username: string,
    password: string,
    session_token: string,
}

export type UserCreationResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: {
        message: UserCreationErrorMessages | 'created'
    }
}

export enum UserCreationErrorMessages {
    FAULTY_PASSWORD = 'faulty_password',
    FAULTY_USERNAME = 'faulty_username',
    FAULTY_PRIVILEGES = 'faulty_privileges',
    FAULTY_CREDENTIALS = 'faulty_credentials',
}

export type LoginRequest = AuthenticationKeys;
export type SHA512String = string;
