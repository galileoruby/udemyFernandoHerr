export interface MedicoColeccionBusquedaResponseModel {
    ok: boolean;
    query: MedicoColeccionBusquedaBaseResponseModel[];
}

export interface MedicoColeccionBusquedaBaseResponseModel {
    nombre: string;
    usuario: {
        nombre: string;
        rol: string;
        google: boolean;
        img?: string;
        id: string;
    },
    hospital:{
        nombre: string;
        img: string;
        id: string
    },
    img: string;
    id: string;
}