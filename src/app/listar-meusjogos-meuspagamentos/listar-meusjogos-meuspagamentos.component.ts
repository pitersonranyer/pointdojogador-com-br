import { Component, OnInit } from '@angular/core';
import { CartolaAPIService } from '../services/cartola-api.service';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

import { ModalMeusTimesComponent } from '../modal/modal-meus-times/modal-meus-times.component';
import { TimeCartola } from '../interfaces/timeCartola';


@Component({
  selector: 'app-listar-meusjogos-meuspagamentos',
  templateUrl: './listar-meusjogos-meuspagamentos.component.html',
  styleUrls: ['./listar-meusjogos-meuspagamentos.component.css']
})
export class ListarMeusJogosMeusPagamentosComponent implements OnInit {
  public meusJogos = [];
  public times: TimeCartola[];
  parciais = [];
  id: number;
  pagamentos = false;
  jogosRodada = false;



  constructor(private jogosService: CartolaAPIService,
    private listarTimesUsuarioRodada: CartolaAPIService,
    private listaResultadoParcialRodada: CartolaAPIService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {

    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    // console.log(this.id);
    this.jogosService.listaMeusJogosMeusPgtos(this.id).subscribe(data => {
      this.meusJogos = data;
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);

  }

  meusTimes(meuJogo: any) {
    this.pagamentos = true;
    this.listarTimesUsuarioRodada.listarTimesUsuarioRodada(meuJogo.anoTemporada, meuJogo.idRodada, this.id, )
    .subscribe((timesCartola: TimeCartola[]) => {
      this.times = timesCartola;
    });

  }

  jogosdaRodada(meuJogo: any) {
    this.jogosRodada = true;

    this.listaResultadoParcialRodada.listaResutaldoParcialRodada(meuJogo.anoTemporada, meuJogo.idRodada)
        .subscribe((resultParcial: any[]) => {
          this.parciais = resultParcial;
          console.log(this.parciais);
        });

  }

}
