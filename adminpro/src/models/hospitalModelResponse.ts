export interface HospitalResponseModel {
    nombre: string;
    id: string;
    img: string;
}

export interface HospitalBaseResponseModel{
    hospitales:HospitalResponseModel[];
    ok: boolean;
}