import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartolaAPIService } from '../services/cartola-api.service';
import { RodadaCartola } from '../interfaces/rodadaCartola';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  anoAtual = 2020;

  public rodada: RodadaCartola;
  public totalParticipantes = 0;
  public premiacaoTotal = 0;
  public premiacaoPercentual = 0;
  public premiacaoFinal = 0;
  public premiacaoFinalFormat = '';
  public dataFim: string;
  public horaFim: string;

  constructor(private router: Router,
    private listarRodadaAtual: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService) { }

  ngOnInit() {
    document.body.className = '';

    this.listarRodadaAtual.listarRodadaCartolaPorTemporada(this.anoAtual).subscribe((rodadaCartola: RodadaCartola) => {
      this.rodada = rodadaCartola;

      this.countRodadaAtual.consultaTimeRodadaCartolaCount(this.rodada.anoTemporada, this.rodada.idRodada).subscribe((count: number) => {
        this.totalParticipantes = count;

        this.premiacaoTotal = this.totalParticipantes * this.rodada.valorRodada;
        this.premiacaoPercentual = (this.premiacaoTotal * 10) / 100;
        this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;

        this.premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });

        this.dataFim = this.rodada.dtFimInscricao.substring(0, 5);
        this.horaFim = this.rodada.hrFimInscricao.substring(0, 5);

      });

    });


  }

  entrar() {
    this.router.navigate(['/login']);
  }

}

