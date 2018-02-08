import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  constructor(public _usuario: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this._usuario.usuario;
  }

  buscar(termino: string) {
  this.router.navigate(['busqueda', termino]);
  }

}
