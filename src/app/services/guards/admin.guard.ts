import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }
  canActivate() {
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.error('BLOQUEADO POR LE GUARDA');
      this._usuarioService.logout();
      return false;
    }
  }
}
