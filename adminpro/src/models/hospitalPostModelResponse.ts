import hospitalSaved from "./hospitalBaseResponseModel";

export interface hospitalPostModelResponse {
    ok: boolean;
    msg: string;
    hospital:hospitalSaved;
}