import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MensageriaService } from './mensageria.service';

/**
 * @author Felipe
 */
@Injectable()
export class UtilService {

    constructor(private mensageriaService: MensageriaService) { }

    getUrlBackend() {
        //   const url = window.location.href;
        //   console.log('location', window.location.href);
        //   console.log(url.match);
        //   if (url.match(/localhost/)) {
        //       return 'http://localhost:3000/api';
        //   }
        //   if (url.match(/pointdojogador/)) {
        return 'http://pointdojogador-api-com-br.umbler.net/api';
        //   }
    }

    /**
     * @description Ordena um objeto array pelo campo passado por parâmentro
     * @returns objeto[] ordenado
     */
    ordenarObjetoArray(objeto: any[], campo: string): any[] {
        return objeto.sort((a, b) => a[campo] - b[campo]);
    }

}
