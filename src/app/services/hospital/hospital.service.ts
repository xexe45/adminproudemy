import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class HospitalService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post(url, { nombre }).map((resp: any) => {
      swal('Hospital Creado', nombre, 'success');
      return resp.hospital;
    });
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
     return this.http.put(url, hospital).map((resp: any) => {
       swal('Hospital Actualizado', hospital.nombre, 'success');
       return true;
     });
  }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).map((resp: any) => resp.hospital);
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).map(( resp: any) => resp.hospitales);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

}
