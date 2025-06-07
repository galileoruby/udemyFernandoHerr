import { UsuarioIngresado } from './booleanos';


describe('pruebas de booleanos ', () => {
    it('retornar true', () => {
        const retornoUsuario = UsuarioIngresado();
        expect(retornoUsuario).toBeTrue();
    })
});