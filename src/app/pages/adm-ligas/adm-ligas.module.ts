import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';

import { AdmLigasRoutes } from './adm-ligas.routing';

import { AdmLigasComponent } from './adm-ligas.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerenciarLigaComponent } from './gerenciar-liga/gerenciar-liga.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(AdmLigasRoutes),
    ComponentsModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    Ng2SearchPipeModule
    
    
  ],
  declarations: [AdmLigasComponent, GerenciarLigaComponent],

  exports: [AdmLigasComponent]

})
export class AdmLigasModule { }
