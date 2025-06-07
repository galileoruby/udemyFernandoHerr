import { obtenerRobots } from './arreglos';



describe('Prueba de arreglos', () => {

    it('retornar elementos de un array', () => {
        const res = obtenerRobots();
        expect(res.length).toBeGreaterThan(4);
    });



    it('debe existir tijeras y no existir excel', () => {
        const res = obtenerRobots();
        expect(res).toContain('Mesa')
        expect(res).not.toContain('excel')
    });


})