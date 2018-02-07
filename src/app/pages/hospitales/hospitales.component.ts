import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  desde: number = 0;
  cargando: boolean = true;
  constructor(public _hospitales: HospitalService, public _modalService: ModalUploadService) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalService.notificacion.subscribe(resp =>
      this.cargarHospitales()
    );
  }

  mostrarModal(id: string) {
    this._modalService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitales.cargarHospitales(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  agregarHospital() {
    swal('Nombre del Hospital:', { content: 'input' }).then(value => {
      this._hospitales.crearHospital(value).subscribe((hospital: Hospital) => {
        console.log(hospital);
        this.cargarHospitales();
      });
    });
  }

  buscarHospital(hospital: string) {
    if (hospital.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitales
      .buscarHospital(hospital)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  actualizarHospital(hospital: Hospital) {
    this.cargando = true;
    this._hospitales.actualizarHospital(hospital).subscribe(() => {
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital) {
    this.cargando = true;
    swal({
      title: '¿Estás Seguro?',
      text: 'Está a punto de borrar al hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._hospitales.borrarHospital(hospital._id).subscribe((resp: any) => {
          console.log(resp);
          this.cargando = false;
          this.cargarHospitales();
          swal(
            'Hospital! ' + resp.hospital.nombre + ' eliminado correctamente',
            {
              icon: 'success'
            }
          );
        });
      } else {
        this.cargando = false;
        swal('Solicitud Cancelada');
      }
    });
  }
}
