import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService
      .buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => (this.medicos = medicos));
  }

  borrarMedico(medico: Medico) {
    // this.cargando = true;
    swal({
      title: '¿Estás Seguro?',
      text: 'Está a punto de borrar al médico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._medicoService
          .borrarMedico(medico._id)
          .subscribe((resp: any) => {
            console.log(resp);
            // this.cargando = false;
            this.cargarMedicos();
            swal(
              'Médico! ' +
                resp.medico.nombre +
                ' eliminado correctamente',
              {
                icon: 'success'
              }
            );
          });
      } else {
        // this.cargando = false;
        swal('Solicitud Cancelada');
      }
    });
  }
}
