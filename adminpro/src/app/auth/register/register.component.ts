import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent {
  public formSubmitted = false;

  public formularioRegistro = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]] as unknown as string,
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [true, [Validators.requiredTrue]],
  }, {
    validators: this.passwordsIgualesX()
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService, private router: Router) {
  }

  crearUsuario() {
    this.formSubmitted = true;

    if (this.formularioRegistro.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.formularioRegistro.value)
      .subscribe({
        next: (v) => {           
          this.router.navigateByUrl('/');
        },
        error: (e) => Swal.fire('Error', e.error.msg, 'error'),
        complete: () => { }
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.formularioRegistro.get(campo)?.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  aceptaTerminos(): boolean {
    return !this.formularioRegistro.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.formularioRegistro.get('password')?.value;
    const pass2 = this.formularioRegistro.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  //metodo del curso.
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }

  passwordsIgualesX() {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get('password');
      const pass2Control = formGroup.get('password2');
      const emailControl = formGroup.get('email');
      // emailControl?.setErrors({emailComercial: true, message:'debe ser un email corporativo.'});

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }
}