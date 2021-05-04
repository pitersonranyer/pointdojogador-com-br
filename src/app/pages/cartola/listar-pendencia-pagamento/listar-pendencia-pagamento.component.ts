import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BilheteCompeticaoCartola } from 'src/app/interfaces/bilheteCompeticaoCartola';
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
  public bilhete: BilheteCompeticaoCartola = <BilheteCompeticaoCartola>{};
  bilhetes = [];


  constructor(
    private listarBilheteGeradoService: CartolaAPIService,
    private atualizarStatusPagamento: CartolaAPIService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.listarBilheteGeradoService.listarBilheteGerado()
      .subscribe((bilhetes: any[]) => {
        this.bilhetes = bilhetes;
      });


  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  liberar(bilhete: any): void {

    this.bilhete.idBilhete = bilhete.idBilhete;
    this.bilhete.nrSequencialRodadaCartola = bilhete.nrSequencialRodadaCartola;

    this.bilhete.nomeUsuario = bilhete.nomeUsuario;
    this.bilhete.statusAtualBilhete = 'Pago';


    this.atualizarStatusPagamento.alterarStatusBilhete(this.bilhete).subscribe(
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

        this.listarBilheteGeradoService.listarBilheteGerado()
          .subscribe((bilhetes: any[]) => {
            this.bilhetes = bilhetes;
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

  cancelar(bilhete: any): void {
    this.bilhete.idBilhete = bilhete.idBilhete;
    this.bilhete.nrSequencialRodadaCartola = bilhete.nrSequencialRodadaCartola;

    this.bilhete.nomeUsuario = bilhete.nomeUsuario;
    this.bilhete.statusAtualBilhete = 'Cancelado';


    this.atualizarStatusPagamento.alterarStatusBilhete(this.bilhete).subscribe(
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

        this.listarBilheteGeradoService.listarBilheteGerado()
          .subscribe((bilhetes: any[]) => {
            this.bilhetes = bilhetes;
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
