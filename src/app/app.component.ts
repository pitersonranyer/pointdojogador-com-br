import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Liga point do jogador';


  constructor(private router: Router,
    public authService: AuthService,
    private tokenService: TokenService,
    private titleService: Title, private metaService: Meta) { }

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'keywords', content: 'Liga, Cartola, Dicas Cartola, Liga Cartola, Catimba, Maior Liga, CatimbaScore, brasileirao, CartolaFC, Mitada no Cartola' },
      { name: 'description', content: 'Liga cartola point do jogador' },
      { name: 'robots', content: 'index, follow' }
    ]);

    if (this.tokenService.token) {
      this.authService.criarSessao(this.tokenService.token);
    }
    this.authService.autenticado$.subscribe(autenticado => {
      if (autenticado) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
