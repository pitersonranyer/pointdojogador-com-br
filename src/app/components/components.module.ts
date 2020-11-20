import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxVectorMapModule } from 'devextreme-angular';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TokenApiService } from '../interceptadores/token-api.service';
import { InvalidTokenApiService } from '../interceptadores/invalid-token-api.service';

@NgModule({
  imports: [CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    JwBootstrapSwitchNg2Module,
    NgbModule,
    DxVectorMapModule],
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenApiService,
      multi: true
    }
  ]
})
export class ComponentsModule { }
