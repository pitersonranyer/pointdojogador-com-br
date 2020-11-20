import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';

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

  constructor(private router: Router,
    private listarTodasRodadaCartolaAtivas: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService) {}


  ngOnInit() {
    this.listarRodadaCartolaAtivas();
  }

  listarRodadaCartolaAtivas() {
    this.listarTodasRodadaCartolaAtivas.listarTodasRodadaCartolaAtivas().subscribe((rodadasCartola: []) => {
      this.rodadas = rodadasCartola;

      for (let i = 0; i < this.rodadas.length; i++) {
        this.count = 0;
        this.countRodadaAtual.consultaTimeRodadaCartolaCount(this.rodadas[i].anoTemporada, this.rodadas[i].idRodada)
          .subscribe((count: number) => {
            this.rodadas[i].totalParticipantes = count;
            this.premiacaoTotal = this.rodadas[i].totalParticipantes * this.rodadas[i].valorRodada;
            this.premiacaoPercentual = (this.premiacaoTotal * 10) / 100;
            this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;

            this.rodadas[i].premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            this.rodadas[i].dataFim = this.rodadas[i].dtFimInscricao.substring(0, 5);
            this.rodadas[i].horaFim = this.rodadas[i].hrFimInscricao.substring(0, 5);

          });
      }
    });
  }

  participarDaRodada(rodada: RodadaCartola): void {
    this.router.navigate(['/cartola/participarDaRodada'], { queryParams: rodada });
  }

}
