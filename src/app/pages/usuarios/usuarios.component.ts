import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  pagination: number[] = [];
  ordanarServer: number = 5;
  inicio: number = 0;
  fin: number = 5; // Cambiar

  constructor(public _usuario: UsuarioService, public _modalService: ModalUploadService) {

  }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuario.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;

      this.cargando = false;

      this.pagination = [];

       for (let i = 0; i < Math.ceil(this.totalRegistros / this.ordanarServer); i++) {
         this.pagination.push(i);
       }

    });

  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  cambiarPagina(valor: number) {
    this.desde = valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this._usuario.buscarUsuarios(termino)
    .subscribe(( usuarios: Usuario[] ) => {
      this.usuarios = usuarios;
    });

  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuario.usuario._id) {
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás Seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._usuario.borrarUsuario(usuario._id)
        .subscribe((resp: any) => {
          console.log(resp);
          this.cargarUsuarios();
          swal('Usuario! ' + resp.usuario.nombre + ' eliminado correctamente', {
            icon: 'success'
          });
        });
      } else {
        swal('Solicitud Cancelada');
      }
    });
  }

  guardarUsuario(usuario: Usuario) {

    this._usuario.actualizarUsuario(usuario).subscribe();

  }

}
