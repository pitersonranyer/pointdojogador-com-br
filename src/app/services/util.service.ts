import { Injectable } from '@angular/core';

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
        }
        if (url.match(/now-pointdojogador-ui/)) {
            return 'https://api.pointdojogador.com.br/api';
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
