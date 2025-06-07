import { mensaje } from './string'
//agrupar pruebas
describe('Componentss', () => {


    it('Funcion que llama mensaje y retorna un string,', () => {
        const mensajeRetorno = mensaje('Gali');        
        expect(typeof mensajeRetorno).toBe('string');
    });

    it('Retornar  saludo con el nombre enviado,', () => {

        const nombre ='Jana';
        const mensajeRetorno = mensaje(nombre);        
        expect(mensajeRetorno).toContain (nombre);
    });
});



//es uuna prueba
