import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { TimeRodadaCartola } from 'src/app/interfaces/timeRodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import swal from 'sweetalert2';


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


   this.atualizarStatusPagamento.atualizarStatusPagamento(this.timeRodadaCartola).subscribe(
    () => {
        swal({
          title: 'Liberado!',
          text: 'Time liberado com sucesso.',
          type: 'success',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
        }).catch(swal.noop)
        this.listaTimeRodadaPendentePgto.listaTimeRodadaPendentePgto(this.timeRodadaCartola.anoTemporada, this.timeRodadaCartola.idRodada)
        .subscribe((listaPendencia: any[]) => {
          this.pendencias = listaPendencia;
        });
    },
    (erro) => {
        swal({
          title: 'Cancelado',
          text: 'Erro ao liberar Time! :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
    });
  }

}
