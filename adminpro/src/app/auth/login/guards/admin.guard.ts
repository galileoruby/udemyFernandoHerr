import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject (Router); 

  let isAdmin: boolean = false;

  if (usuarioService.role === 'ADMIN_ROLE'){
    isAdmin = true;
  }else{
     router.navigateByUrl('/');
    return false;
  }
  return isAdmin;
};
