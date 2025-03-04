import { environment } from "src/environments/environment"

const apiUrl = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public rol?: string,
        public id?: string,
    ) { }

    get imagenUrl() {        
        let currentImg: string = `${apiUrl}/upload/usuarios/no-image`;

        if (!this.img){
            return currentImg;
        }

        if (this.img?.startsWith('https')){
            return this.img;
        }else{

            return `${apiUrl}/upload/usuarios/${this.img}`;
        }              
    }
}