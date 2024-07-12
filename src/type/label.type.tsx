import { DuegevAPIIntents, DuegevAPIResponseMessage } from "../services/API/API.enum"

export type Label = {
    lid?: number,           /* Label Unique ID */
    uid?: number,           /* Owner ID */
    label: string,          /* Label text content */
    description: string     /* Label description */
}


export type LabelQuery = {
    intent: DuegevAPIIntents
    query?: {               /* Only at create /update / delete intents */
        session_token: string,
        uid: number,
        label: string,
        description: string,
        lid?: number
    }
}

export type LabelQueryResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: Array<Label> | LabelQueryError
}


export type LabelUpdateQuery = {
    intent: DuegevAPIIntents.UPDATE_LABEL,
    query: {
        session_token: string,
        updatedLabel: Label
    }
}

export type LabelUpdateResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: Label | LabelQueryError
}

export enum LabelQueryError {
    INVALID_SESSION_TOKEN = 'invalid_session_token',
    INSUFFICIENT_PRIVILEGES = 'insufficient_privileges',
    INTERNAL_ERROR = 'internal_error',
    LABEL_ALREADY_EXISTS = 'label_already_exists',
    FAULTY_LABEL = 'faulty_label'
}