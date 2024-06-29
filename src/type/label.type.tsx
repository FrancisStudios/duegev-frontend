import { DuegevAPIIntents, DuegevAPIResponseMessage } from "../services/API/API.enum"

export type Label = {
    lid: number,            /* Label Unique ID */
    uid: number,            /* Owner ID */
    label: string,          /* Label text content */
    description: string     /* Label description */
}


export type LabelQuery = {
    intent: DuegevAPIIntents
    query?: {               /* Only at create /update / delete intents */
        uid: number,
        label: string,
        description: string,
        lid?: number
    }
}

export type LabelQueryResponse = {
    intent: DuegevAPIIntents,
    message: DuegevAPIResponseMessage,
    data: Array<Label>
}