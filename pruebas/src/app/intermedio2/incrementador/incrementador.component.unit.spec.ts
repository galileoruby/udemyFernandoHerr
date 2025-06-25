
import { IncrementadorComponent } from './incrementador.component';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
describe('incrementador component unit', () => {


        let component: IncrementadorComponent;
        let fixture: ComponentFixture<IncrementadorComponent>;

     beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [IncrementadorComponent],
                imports: [FormsModule]
            });
    
            fixture = TestBed.createComponent(IncrementadorComponent);
            component = fixture.componentInstance;
    
        });

    it('no debe pasar de 100 el progreso', () => {
        component.progreso = 50;
        component.cambiarValor(5);

        expect(component.progreso).toBe(55);
    })

});