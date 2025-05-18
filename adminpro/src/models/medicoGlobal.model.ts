export interface MedicoGlobalModel{
    nombre:string;
    usuario:{
        _id: string;
        nombre: string;
        img: string;
    },
    hospital: string;
    id: string;
    img?:string;
}