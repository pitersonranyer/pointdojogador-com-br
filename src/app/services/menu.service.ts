
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { UtilService } from './util.service';
import { MensageriaService } from './mensageria.service';


@Injectable()
export class MenuService {

    constructor(public util: UtilService,
        private mensageria: MensageriaService) { }

    public menuCompleto: MenuItem[] = [];

}
