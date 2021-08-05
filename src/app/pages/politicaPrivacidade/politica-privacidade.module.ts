import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/components/components.module';
import { PoliticaPrivacidadeComponent } from './politica-privacidade.component';
import { PoliticaPrivacidadeRoutes } from './politica-privacidade.routing';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(PoliticaPrivacidadeRoutes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PoliticaPrivacidadeComponent],

  exports: [PoliticaPrivacidadeComponent]

})
export class PoliticaPrivacidadeModule { }
