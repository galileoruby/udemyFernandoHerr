import { incrementar} from './numeros';

describe('Pruebas de numeros ', () => {

    it('Retornar 100 si numero es mayor a 100', () => {
        const retornoIncremento=  incrementar(500);
        expect( retornoIncremento).toBe(100);
    });

    it('Retornar numero ingresado +1', () => {
        const retornoIncremento=  incrementar(5);
        expect( retornoIncremento).toBe(6);
    });
})
