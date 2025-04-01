export interface MedicoPutModelResponse{
    ok: boolean;
    msg: string;
    medico:MedicoPutModelBaseResponse
}

export interface MedicoPutModelBaseResponse{
    nombre: string;
    usuario: string;
    hospital: string; 
    img:string;
    id: string;
}