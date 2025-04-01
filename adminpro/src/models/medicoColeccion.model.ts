export interface MedicoColeccionModel {
    ok: boolean;
    medicos: MedicoColeccionResponseModel[];
}

export interface MedicoSingleModel{
    ok:boolean,
    medico: MedicoColeccionResponseModel
}

export interface MedicoColeccionResponseModel{
    nombre:string;
    usuario:{
        _id: string;
        nombre:string;
    },
    hospital?:{
        _id: string;
        nombre:string
    },
    id:string;
    img?:string;
}