import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  constructor(public _subirArchivo: SubirArchivoService, public _modalService: ModalUploadService) {

  }

  ngOnInit() {}

  subirImagen() {
    this._subirArchivo.subirArchivo(this.imagenSubir, this._modalService.tipo, this._modalService.id)
      .then((resp: any) => {
        // console.log(resp);
        this._modalService.notificacion.emit(resp);
        // this._modalService.ocultarModal();
        this.cerrarModal();
       } )
      .catch(err => console.log('Error en la carga'));
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalService.ocultarModal();

  }

  seleccionaImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (!archivo.type.includes('image')) {
      swal(
        'Sólo Imágenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
}
