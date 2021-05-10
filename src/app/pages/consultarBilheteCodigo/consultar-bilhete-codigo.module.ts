import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultarBilheteCodigoRoutes  } from './consultar-bilhete-codigo.routing';
import { ConsultarBilheteCodigoComponent } from './consultar-bilhete-codigo.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(ConsultarBilheteCodigoRoutes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ConsultarBilheteCodigoComponent],

  exports: [ConsultarBilheteCodigoComponent]

})
export class ConsultarBilheteCodigoModule { }
