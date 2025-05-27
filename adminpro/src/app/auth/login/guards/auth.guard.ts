import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
//import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { UsuarioService } from '../../../services/usuario.service';


// Guard para CanActivate
export const authGuard: CanActivateFn = (route, state) => {
  return checkAuth();
};


// Guard para CanLoad (Angular 15+ usa CanMatchFn en lugar de CanLoad)
export const authCanLoadGuard: CanMatchFn = (route, segments) => {
  return checkAuth();
};

// Función común para validar autenticación (reutilizable)
function checkAuth() {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  return usuarioService.validarToken().pipe(
    tap((esAutenticado) => {
      if (!esAutenticado) {
        router.navigateByUrl('/login');
      }
    })
  );
}