import { ExpansionCase } from '@angular/compiler';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';

import { from, EMPTY, throwError } from 'rxjs';
import { map, Observable, tap, catchError, of } from 'rxjs';

describe('MedicosComponent', () => {
    let componente: MedicosComponent;
    const servicio = new MedicosService(null);

    beforeEach(() => {
        componente = new MedicosComponent(servicio);
    });

    it('Init: Debe de cargar los medicos', () => {
        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return from([
                ['medico1', 'medico2', 'medico3']
            ])
        })
        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);
    });

    it('debe llamar al servidor para agregar un medico', () => {
        const espia = spyOn(servicio, 'agregarMedico').and.callFake(medico => {
            return EMPTY;
        });
        componente.agregarMedico();
        expect(espia).toHaveBeenCalled();
    });

    it('debe agregar un nuevo medico  al arreglo de medicos', () => {
        const medico = { id: 1, nombre: 'Roxy Pop' };
        spyOn(servicio, 'agregarMedico').and.returnValue(from([medico]));
        componente.agregarMedico();
        //confirmo que el medico enviado este incluido en el arreglo
        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
    });

    it('si falla la adicion, la propiedad error, sera igual a error de servicio', () => {
        const miError = 'No se pudo agregar';
        spyOn(servicio, 'agregarMedico').and
            .returnValue(throwError(() => miError));
        componente.agregarMedico();
        expect(componente.mensajeError).toBe(miError);
    });

    it('debe llamar al servidor para borrar un medico', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);
        componente.borrarMedico('1');
        expect(espia).toHaveBeenCalledWith('1');
    });

    it('NO debe llamar al servidor para borrar un medico', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);
        componente.borrarMedico('1');
        expect(espia).not.toHaveBeenCalledWith('1');
    });
});