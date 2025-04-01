import { HospitalResponseModel } from "./hospitalModelResponse";
export default class Hospital {
    constructor(
        public nombre: string,
        public id?: string,
        public img?: string,
        public usuario?: HospitalResponseModel[]
    ) { }
}