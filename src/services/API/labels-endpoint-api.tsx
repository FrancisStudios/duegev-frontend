import { Label, LabelQuery, LabelQueryResponse } from "../../type/label.type";
import { APIConnection } from "./API.connection";
import { API_PATH, DuegevAPIIntents, DuegevAPIResponseMessage } from "./API.enum";

export class LabelsEndpoint {
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
                        resolve(response.data);
                    }
                })
        })
    }
}