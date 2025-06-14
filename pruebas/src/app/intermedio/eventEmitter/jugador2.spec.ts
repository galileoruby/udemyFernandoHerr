import { Jugador2 } from './jugador2';

describe('jugador dos emit', () => {

    let _jugador: Jugador2;

    beforeEach(() => { _jugador = new Jugador2() });

    it('debe emitir un evento cuando recibe danio', () => {
        let nuevoHp = 0;
        _jugador.hpCambia.subscribe(xhp => {
            nuevoHp = xhp;
        });

        _jugador.recibeDanio(1000);
        expect(nuevoHp).toBe(0);
    });

    it('debe emitir un evento cuando recibe danio y sobrevivir si < 100', () => {
        let nuevoHp = 0;
        _jugador.hpCambia.subscribe(xhp => {
            nuevoHp = xhp;
        });
        _jugador.recibeDanio(50);
        expect(nuevoHp).toBe(50);
    });
})