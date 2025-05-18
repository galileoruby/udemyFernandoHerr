export interface HospitalGlobalModel{

    nombre:string;
    usuario:{
        _id: string;
        nombre: string;
        img?: string;
    }

    img?:string;
    id: string;
}