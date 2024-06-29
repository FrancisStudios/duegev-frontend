import { UserDataStore } from "../../store/user-data.store";
import { Label, LabelQuery, LabelQueryResponse } from "../../type/label.type";
import { APIConnection } from "./API.connection";
import { API_PATH, DuegevAPIIntents, DuegevAPIResponseMessage } from "./API.enum";

export class LabelsEndpoint {

    private static UserMgmt = UserDataStore.getInstance();

    private static makeRequest(requestData: any): Promise<any> {
        return new Promise(resolve => {
            fetch(`http://${APIConnection.IP}:${APIConnection.PORT}${API_PATH.LABELS}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => { resolve(data) });
        });
    }


    public static getAllLabels(): Promise<Label[]> {
        return new Promise(resolve => {
            const query: LabelQuery = { intent: DuegevAPIIntents.GET_ALL_LABELS }
            this.makeRequest(query)
                .then((response: LabelQueryResponse) => {
                    if (response.message === DuegevAPIResponseMessage.OK) {
                        resolve(response.data as Array<Label> ?? []);
                    }
                })
        })
    }

    public static createLabel(labelData: Label): Promise<LabelQueryResponse> {
        return new Promise(resolve => {
            const query: LabelQuery = {
                intent: DuegevAPIIntents.CREATE_LABEL,
                query: {
                    session_token: this.UserMgmt.getSessionToken,
                    uid: this.UserMgmt.getLocalUser.uid,
                    label: labelData.label,
                    description: labelData.description
                }
            }

            this.makeRequest(query)
                .then((response: LabelQueryResponse) => { resolve(response) });
        });
    }
}