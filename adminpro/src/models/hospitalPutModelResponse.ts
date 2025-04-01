import hospitalSaved from "./hospitalBaseResponseModel";

export interface hospitalPutModelResponse {
    ok: boolean;
    msg: string;
    hospital:hospitalSaved;
}