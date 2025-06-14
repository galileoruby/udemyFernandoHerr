import { FormBuilder } from '@angular/forms';
import { FormularioRegister } from './formulario';

describe('Formularios', () => {
    let componente: FormularioRegister;

    beforeEach(() => {
        componente = new FormularioRegister(new FormBuilder());
    });

    it('crear un formulario con 2 campos', () => {
        expect(componente.form.contains('email')).toBeTruthy();
        expect(componente.form.contains('password')).toBeTruthy();
    });

    it('email obligatorio', () => {
        const control = componente.form.get('email');
        control?.setValue('');
        expect(control?.valid).toBeFalse();
    });

    it('email valido', () => {
        const control = componente.form.get('email');
        control?.setValue('GANIMEDESA@HOTMAIL.COM');
        expect(control?.valid).toBeTruthy();
    });
});