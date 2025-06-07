import { Jugador } from "./clase"

describe('pruebas de clasde vida ', () => {
    let jugador = new Jugador();


    beforeAll(() => {
        console.log('beforeall', jugador)
    });

    beforeEach(() => {
        jugador = new Jugador();
    });

    afterAll(() => {
        console.log('beforeEach', jugador)
    });

    afterEach(() => {
        console.log('afterEach', jugador)
    });

    it('debe retornar 80 de daño si recibe 20 de daño', () => {
        const respuesta = jugador.recibeDanio(20);
        expect(respuesta).toBe(80);
    });

    it('debe retornar 50 si recibe 50 de daño', () => {
        const respuesta = jugador.recibeDanio(50);
        expect(respuesta).toBe(50);
    });

    it('debe retornar 0 si recibe 100 de daño', () => {
        const respuesta = jugador.recibeDanio(100);
        expect(respuesta).toBe(0);
    });
})