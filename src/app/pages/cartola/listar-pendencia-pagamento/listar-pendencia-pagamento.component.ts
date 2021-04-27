import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  anoAtual = 2021;
  pendencias = [];


  constructor(private listarRodadaAtual: CartolaAPIService,
    private listaTimeRodadaPendentePgto: CartolaAPIService,
    private atualizarStatusPagamento: CartolaAPIService,
    private cancelarInscricaoTime: CartolaAPIService,
    private toastr: ToastrService,
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
        this.toastr.success(
          '<span class="now-ui-icons ui-1_bell-53"></span>' +
          ' Time liberado com sucesso!',
          '',
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'right'
          }
        );

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

  cancelar(pendencia: any): void {

    this.cancelarInscricaoTime.cancelarInscricaoTime(pendencia.anoTemporada,
      pendencia.idRodada,
      pendencia.idUsuario,
      pendencia.time_id
    ).subscribe(
      () => {
        this.toastr.success(
          '<span class="now-ui-icons ui-1_bell-53"></span>' +
          ' Liberação do Time cancelada com sucesso!',
          '',
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'right'
          }
        );

        this.listaTimeRodadaPendentePgto.listaTimeRodadaPendentePgto(pendencia.anoTemporada, pendencia.idRodada)
          .subscribe((listaPendencia: any[]) => {
            this.pendencias = listaPendencia;
          });
      },
      (erro) => {
        swal({
          title: 'Cancelado',
          text: 'Erro ao cancelar liberação do Time! :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      });
  }

}
