import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }

  canActivate(): Promise<boolean> | boolean {
    console.log('Inicio de Verifica Token Guard');
    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000) );
      // console.log( tokenExp );
      // console.log( ahora );
      if ( tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }
    });
  }

  expirado(fechaExpiracion: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
