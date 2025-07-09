
import { HospitalComponent } from 'src/app/intermedio2/hospital/hospital.component';
import { Rutas } from './app.routes';

describe('Rutas principales', () => {

    it('Debe existir la ruta /medico/:id', () => {

        expect(Rutas).toContain(
            { path: 'hospital', component: HospitalComponent }
        )

    })

})