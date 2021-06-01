import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BilheteCompeticaoCartola } from 'src/app/interfaces/bilheteCompeticaoCartola';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  id: number;
  closeResult: string;

  count = 0
  nomeLigaOne = '';
  tipoCompeticaoOne = '';
  nrRodadaOne = 0;
  listas = [];
  valorBilheteFormat = '';
  codigoBilheteOne = ''
  totalParticipantes = 0;
  premiacaoTotal = 0;
  premiacaoPercentual = 0;
  premiacaoFinalFormat = '';
  countParticipantes = 0;
  nomeUsuarioOne = '';
  nomeAdmOne = '';

  httpsWapp = 'https://wa.me/55';
  nrWapp = '';
  urlWapp = [];

  constructor(
    private listarBilheteGeradoIdService: CartolaAPIService,
    private atualizarStatusPagamento: CartolaAPIService,
    private consultarTimeBilhetePorCodigoService: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService,
    private dadosUsuarioService: CartolaAPIService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {

    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    this.listarBilheteGeradoIdService.listarBilheteGeradoId(this.id)
      .subscribe((bilhetes: any[]) => {
        this.bilhetes = bilhetes;

        for (let x = 0; x < this.bilhetes.length; x++) {
          this.nrWapp = this.bilhetes[x].nrContatoUsuario.replace('(', '').replace(')', '').replace('-', '');
          this.urlWapp[x] = this.httpsWapp + this.nrWapp;
        }

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

        swal({
          title: "Bilhete: ",
          text: `https://www.pointdojogador.com.br/consultar-bilhete-codigo/consultarBilheteCodigo?codigoBilhete=${bilhete.codigoBilhete}`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).catch(swal.noop);

        this.listarBilheteGeradoIdService.listarBilheteGeradoId(this.id)
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

        this.listarBilheteGeradoIdService.listarBilheteGeradoId(this.id)
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


  showModalBilhete(content, codigoBilhete: string) {


    this.consultarTimeBilhetePorCodigoService
      .consultarTimeBilhetePorCodigo(codigoBilhete)
      .subscribe((result: any) => {
        this.count = result.length
        this.listas = result;
        this.nomeLigaOne = result[0].nomeLiga;
        this.tipoCompeticaoOne = result[0].tipoCompeticao;
        this.nrRodadaOne = result[0].nrRodada;
        let valorBilhete = result[0].valorCompeticao * this.count
        this.valorBilheteFormat = valorBilhete.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        this.codigoBilheteOne = result[0].codigoBilhete;
        this.nomeUsuarioOne = result[0].nomeUsuario;

        this.dadosUsuarioService.consultarUsuario(result[0].idUsuarioAdmLiga)
          .subscribe((usu: any) => {
            this.nomeAdmOne = usu.nome;
          });

        this.countRodadaAtual.consultaTimeCompeticaoCount(result[0].nrSequencialRodadaCartola)
          .subscribe((data: number) => {
            this.countParticipantes = data;

            this.totalParticipantes = this.countParticipantes;
            this.premiacaoTotal = this.totalParticipantes * result[0].valorCompeticao;
            this.premiacaoPercentual = (this.premiacaoTotal * result[0].txAdm) / 100;
            let premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;
            this.premiacaoFinalFormat = premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });

          });

      });




    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }



}
