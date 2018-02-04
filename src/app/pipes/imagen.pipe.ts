import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if (!imagen) {
      return url + '/usuarios/xxx';
    }

    if (imagen.includes('googleusercontent')) {
      return imagen;
    }

    switch (tipo) {
      case 'usuario':
           url += '/usuarios/' + imagen;
        break;
      case 'medico':
          url += '/medicos/' + imagen;
        break;
      case 'hospital':
          url += '/hospitales/' + imagen;
        break;

        default:
        console.log('Tipo de imagen no existe, usuarios, medicos, hospitales');
        url += '/usuarios/xxx';
    }
    
    return url;
  }

}
