import { Injectable } from '@angular/core';


/**
 * @author Felipe
 */
@Injectable()
export class UtilService {

    constructor() { }

    getUrlBackend() {
        const url = window.location.href;
        if (url.match(/localhost/)) {
            return 'http://localhost:3000/api';
        }
        if (url.match(/pointdojogador/)) {
            return 'https://api.pointdojogador.com.br/api';
           // return 'http://pointdojogador-api-com-br.umbler.net/api';
        }
    }

    /**
     * @description Ordena um objeto array pelo campo passado por parâmentro
     * @returns objeto[] ordenado
     */
    ordenarObjetoArray(objeto: any[], campo: string): any[] {
        return objeto.sort((a, b) => a[campo] - b[campo]);
    }

}
