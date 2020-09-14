import { Component, OnInit } from '@angular/core';
import { CartolaAPIService } from '../services/cartola-api.service';
import { Router } from '@angular/router';
import { RodadaCartola } from '../interfaces/rodadaCartola';
import { TimeRodadaCartola } from '../interfaces/timeRodadaCartola';


@Component({
  selector: 'app-listar-pendencia-pagamento',
  templateUrl: './listar-pendencia-pagamento.component.html',
  styleUrls: ['./listar-pendencia-pagamento.component.css']
})
export class ListarPendenciaPagamentoComponent implements OnInit {
  public rodada: RodadaCartola;
  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};
  anoAtual = 2020;
  pendencias = [];


  constructor(private listarRodadaAtual: CartolaAPIService,
    private listaTimeRodadaPendentePgto: CartolaAPIService,
    private atualizarStatusPagamento: CartolaAPIService,

    private router: Router) { }

  ngOnInit() {
    this.listarRodadaAtual.listarRodadaCartolaPorTemporada(this.anoAtual).subscribe((rodadaCartola: RodadaCartola) => {
      this.rodada = rodadaCartola;

      this.listaTimeRodadaPendentePgto.listaTimeRodadaPendentePgto(this.rodada.anoTemporada, this.rodada.idRodada)
        .subscribe((listaPendencia: any[]) => {
          this.pendencias = listaPendencia;
        });

    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  liberar(pendencia: any): void {

   this.timeRodadaCartola.anoTemporada = pendencia.anoTemporada;
   this.timeRodadaCartola.idRodada = pendencia.idRodada;
   this.timeRodadaCartola.idUsuario = pendencia.idUsuario;
   this.timeRodadaCartola.time_id = pendencia.time_id;

   console.log(this.timeRodadaCartola);

   this.atualizarStatusPagamento.atualizarStatusPagamento(this.timeRodadaCartola).subscribe(
    () => {
      console.log('Liberação realizado com sucesso');
      this.listaTimeRodadaPendentePgto.listaTimeRodadaPendentePgto(this.timeRodadaCartola.anoTemporada, this.timeRodadaCartola.idRodada)
        .subscribe((listaPendencia: any[]) => {
          this.pendencias = listaPendencia;
        });
      //  this.toastr.success('Cadastro realizado com sucesso', 'Show!');
    },
    (erro) => {
      if (erro.status && erro.status === 409) {
        console.log('Time já cadastrado');
        //   this.toastr.error('Palpite já cadastrado.', 'Falha!');
      } else {
        console.log('Não foi possível realizar a liberação do pagamento');
        //  this.toastr.error('Não foi possível realizar o cadastro o palpite.', 'Falha!');
      }
    }
  );
  }

}
