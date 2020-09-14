import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'point do jogador';
 

  constructor(private appService: AppService,
    private router: Router,
    public authService: AuthService,
    private tokenService: TokenService) {   }

    ngOnInit() {
      
      if (this.tokenService.token) {
        this.authService.criarSessao(this.tokenService.token);
      }
      this.authService.autenticado$.subscribe(autenticado => {
        if (autenticado) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/landing']);
        }
      });
    }
}
