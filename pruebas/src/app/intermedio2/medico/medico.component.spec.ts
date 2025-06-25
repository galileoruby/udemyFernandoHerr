import { MedicoComponent } from "./medico.component"

//la forma de decir a angular que utilizara pipe services 

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MedicoService } from "./medico.service";
import { HttpClientModule } from "@angular/common/http";


describe('Medico component', () => {

    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;

    beforeEach(() => {

        //el testbed configurarlo en el before-each ultra requerido

        TestBed.configureTestingModule({
            declarations: [MedicoComponent],
            providers: [MedicoService],
            imports: [HttpClientModule]
        });
        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })





    it('Debera crearse componente', () => {
        expect(component).toBeTruthy();
    });


    it('Debe retornar nombre del medico 509', () => {
        const nombre = 'juan';

        const res = component.saludarMedico(nombre);

        expect(res).toContain(nombre);

    });






})