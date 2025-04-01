export interface HospitalColeccionModel {
    ok: boolean;
    query: HospitalColeccionResponseModel[];
}

export interface HospitalColeccionResponseModel {
    nombre: string;
    usuario: {
        nombre: string;
        rol: string;
        google: boolean;
        img?: string;
        id: string;
    }
    img: string;
    id: string;
}