import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import LoginForm from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService  ,
    private ngZone: NgZone
  ) {

    this.loginForm = this.fb.group<LoginForm>({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]] as unknown as string,
      password: ['123456', [Validators.required]] as unknown as string,
      remember: [true, [Validators.requiredTrue]] as unknown as boolean
    });
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "74894576610-1kvmhajb8mm75h3atkht2c65i9379sln.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp => {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/');
        });
      });
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next: (v) => {           
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)
          } else {
            localStorage.removeItem('email');
          }
            this.router.navigateByUrl('/');        
        },
        error: (e) => {
          Swal.fire('Error', e.error.msg, 'error')
        },
        complete: () => { console.info('complete') }
      });
  }
}