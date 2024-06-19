import { UserData } from "../../type/user-data.type"
import { DuegevAPIIntents, DuegevAPIResponseMessage } from "./API.enum"

export type APIResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: Array<UserData | string> /* Add all available response */
}