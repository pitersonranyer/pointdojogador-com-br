import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public totalParticipantes = 0;
  public premiacaoTotal = 0;
  public premiacaoPercentual = 0;
  public premiacaoFinal = 0;
  public premiacaoFinalFormat = '';

  dataFim: string;
  horaFim: string;

  count: number;

  public rodadas = [];

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  constructor(private router: Router,
    private listarTodasCompeticaoCartolaAtivas: CartolaAPIService,
    public usuarioService: UsuarioService,
    private countRodadaAtual: CartolaAPIService) {
      this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);
    }


  ngOnInit() {
    
    this.listarCompeticaoCartolaAtivas();
  }

  listarCompeticaoCartolaAtivas() {
    this.listarTodasCompeticaoCartolaAtivas.listarCompeticaoCartolaAtivas().subscribe((competicaoCartola: []) => {
      this.rodadas = competicaoCartola;

      for (let i = 0; i < this.rodadas.length; i++) {
        this.count = 0;
        this.countRodadaAtual.consultaTimeCompeticaoCount(this.rodadas[i].nrSequencialRodadaCartola)
          .subscribe((data: number) => {
            this.count = data;
            
            this.rodadas[i].totalParticipantes = this.count;
            this.premiacaoTotal = this.rodadas[i].totalParticipantes * this.rodadas[i].valorCompeticao;
            this.premiacaoPercentual = (this.premiacaoTotal * this.rodadas[i].txAdm) / 100;
            this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;

            this.rodadas[i].premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            this.rodadas[i].dataFim = this.rodadas[i].dataFimInscricao.substring(0, 5);
            this.rodadas[i].horaFim = this.rodadas[i].horaFimInscricao.substring(0, 5);
   
          });
      }

    });
  }

  participarDaRodada(rodada: CompeticaoCartola): void {
    this.router.navigate(['/cartola/participarDaRodada'], { queryParams: rodada });
  }

}
