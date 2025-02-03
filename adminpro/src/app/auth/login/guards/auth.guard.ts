import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { UsuarioService } from '../../../services/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const _router = inject(Router);

  return usuarioService.validarToken()
    .pipe(
      tap(esAutenticado => {
        
        if (!esAutenticado) {
          _router.navigateByUrl('/login');
        }
      })
    );
};