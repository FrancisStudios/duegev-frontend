import { UserData } from "../../type/user-data.type"
import { DuegevAPIIntents, DuegevAPIResponseMessage } from "./API.enum"

export type APIResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: Array< /* Add all available response */
        UserData |
        string |
        UserDataChangeResponse
    >
}

export type UserDataChangeResponse = UserData