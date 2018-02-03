import { element } from 'protractor';
import { UsuarioService } from './../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '361864509692-ni5erq6s9e7ahmlaadm2qldgnhgjfcjk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( elemento ) {
    this.auth2.attachClickHandler(elemento, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe(resp => {
          window.location.href = '#/dashboard';
           // this.router.navigate(['/dashboard']);
        });
      // console.log( token );
    });
  }

  ingresar( forma: NgForm ) {
    // this.router.navigate(['/dashboard']);
    if ( forma.invalid ) {
     return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(correcto => this.router.navigate(['/dashboard']));

  }

}
