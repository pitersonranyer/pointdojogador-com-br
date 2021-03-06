import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BilheteCompeticaoCartola } from 'src/app/interfaces/bilheteCompeticaoCartola';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { HistoricoTimeUsuario } from 'src/app/interfaces/historicoTimeUsuario';
import { TimeBilheteCompeticaoCartola } from 'src/app/interfaces/timeBilheteCompeticaoCartola';
import { TimeLigaCartola } from 'src/app/interfaces/timeLigaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import swal from "sweetalert2";
import { ModalTimesFavoritosComponent } from './modal-times-favoritos/modal-times-favoritos.component';

@Component({
  selector: 'app-gerar-bilhete',
  templateUrl: './gerar-bilhete.component.html',
  styleUrls: ['./gerar-bilhete.component.css']
})
export class GerarBilheteComponent implements OnInit {

  timesUsuario = [];
  closeResult: string;
  codigoBilhete = '';

  nome = ''

  competicaoRodada: CompeticaoCartola = <CompeticaoCartola>{};
  historicoTimeUsuario: HistoricoTimeUsuario = <HistoricoTimeUsuario>{};
  bilhete: BilheteCompeticaoCartola = <BilheteCompeticaoCartola>{};
  timeBilhete: TimeBilheteCompeticaoCartola = <TimeBilheteCompeticaoCartola>{};

  formulario = new FormGroup({
    contato: new FormControl()
  })


  results$: Observable<any>;

  arrayTimesUsuario = [];

  nomeTimePsq = '';
  nomeTimeBusca: string;
  codigo = '';
  idBilheteUsuario = 0;

  timesLigaCartola = [];
  count = 0;
  temTime = 0;
  proximo = false;
  hstTime = false;
  porId = false;
  porNome = false;

  retBilheteService: any;

  tempArrayObj = [];



  constructor(private listarTimeBilheteService: CartolaAPIService,
    private excluirTimeBilheteService: CartolaAPIService,
    private excluirBilheteService: CartolaAPIService,
    private listarTimesCartola: CartolaAPIService,
    private gerarBilhete: CartolaAPIService,
    private gerarBilhetePorIds: CartolaAPIService,
    private atualizarStatusPagamento: CartolaAPIService,
    private listarHistoricoTimesService: CartolaAPIService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.timesLigaCartola = [];
    this.arrayTimesUsuario = [];

    this.route.queryParams.subscribe(params => {
      this.competicaoRodada.nrSequencialRodadaCartola = params.nrSequencialRodadaCartola;
      this.competicaoRodada.anoTemporada = params.anoTemporada;
      this.competicaoRodada.dataFimInscricao = params.dataFimInscricao;
      this.competicaoRodada.horaFimInscricao = params.horaFimInscricao;
      this.competicaoRodada.nrRodada = params.nrRodada;
      this.competicaoRodada.statusCompeticao = params.statusCompeticao;
      this.competicaoRodada.valorCompeticao = params.valorCompeticao;
      this.competicaoRodada.idUsuarioAdmLiga = params.idUsuarioAdmLiga;
      this.competicaoRodada.nomeLiga = params.nomeLiga;
      this.competicaoRodada.tipoCompeticao = params.tipoCompeticao;
    });


    //   this.results$ = this.formulario.get('contato').valueChanges
    //     .pipe(
    //       map(value => value.trim()),
    //       filter(value => value.length > 3),
    //       debounceTime(200),
    //       switchMap(value => this.listarTimeBilheteService
    //         .listarTimeBilheteGerado(value, this.competicaoRodada.nrSequencialRodadaCartola),
    //       ),
    //       tap((res: any) => Object.keys(res)
    //         .forEach(value => {
    //           this.arrayTimesUsuario = [];
    //           const timeUsuario = {
    //             idBilhete: res[value].idBilhete,
    //             codigoBilhete: res[value].codigoBilhete,
    //             nomeUsuario: res[value].nomeUsuario,
    //             nrContatoUsuario: res[value].nrContatoUsuario,
    //             nrSequencialRodadaCartola: res[value].nrSequencialRodadaCartola,
    //             time_id: res[value].time_id
    //           };
    //           this.arrayTimesUsuario.push(timeUsuario);
    //           this.formulario.get('nome').setValue(this.arrayTimesUsuario[0].nomeUsuario);
    //           this.idBilheteUsuario = this.arrayTimesUsuario[0].idBilhete;
    //           this.codigoBilhete = this.arrayTimesUsuario[0].codigoBilhete;
    //           this.isReadOnly = true;
    //         })),

    //      );

    //   this.results$.subscribe(result => {
    //     this.count = result.length
    //     this.flag = result[0].time_id;
    //   });
  }


  Proximo() {

    this.proximo = true

    this.recuperarListaTimeBilhete();

    this.recuperarListaHistorico();

  }


  recuperarListaTimeBilhete() {

    this.listarTimeBilheteService
      .listarTimeBilheteGerado(this.formulario.get('contato').value, this.competicaoRodada.nrSequencialRodadaCartola)
      .subscribe((value: any) => {
        this.arrayTimesUsuario = value;
        this.count = this.arrayTimesUsuario.length;
        if (this.arrayTimesUsuario.length) {
          this.nome = this.arrayTimesUsuario[0].nome_cartola;
          this.idBilheteUsuario = this.arrayTimesUsuario[0].idBilhete;
          this.codigoBilhete = this.arrayTimesUsuario[0].codigoBilhete;
          this.temTime = this.arrayTimesUsuario[0].time_id;
        }
      });

  }


  recuperarListaHistorico() {

    this.listarHistoricoTimesService
      .listarHistoricoTimesUsuario(this.formulario.get('contato').value)
      .subscribe((hstTimes: any) => {
        if (hstTimes.length) {
          this.hstTime = true;
        } else {
          this.hstTime = false
        }
      });
  }



  limpar() {
    this.proximo = false;
    this.hstTime = false;
    this.porNome = false;
    this.porId = false;
    this.idBilheteUsuario = 0;
    this.codigoBilhete = '';
    this.formulario.reset();
    this.ngOnInit();
  }


  addTimesPorId(content) {
    this.timesLigaCartola = [];
    this.porId = true;
    this.porNome = false;
    this.modalService.open(content).result.then(
      result => {

        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

  }

  addTimesPorNome(content) {
    this.porNome = true;
    this.porId = false;
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
      this.recuperarListaTimeBilhete();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.recuperarListaTimeBilhete();
      return 'by clicking on a backdrop';
    } else {
      this.recuperarListaTimeBilhete();
      return `with: ${reason}`;
    }

  }



  cadastrarTimesPorId(id: string) {
    let arraySlugs = id.split(";").map(Number);
    
    if (isNaN(arraySlugs[0])) {
      this.toastr.error(
        '<span class="now-ui-icons ui-1_bell-53"></span>' +
        'C??DIGO INV??LIDO</b>' +
        ' - Informe os c??digos conforme Ex: id1;id2;id3',
        '',
        {
          timeOut: 8000,
          enableHtml: true,
          closeButton: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + 'top' + '-' + 'right'
        }
      );
    } else {

      this.tempArrayObj = [];
      arraySlugs.forEach(time_id => {
        const criaObj = {
          time_id: time_id,
          idBilhete: this.idBilheteUsuario,
          nrSequencialRodadaCartola: this.competicaoRodada.nrSequencialRodadaCartola,
          nrContatoUsuario: this.formulario.get('contato').value
        };
        this.tempArrayObj.push(criaObj);
      })

      
      // PITERSON
      this.gerarBilhetePorIds.gerarBilheteCompeticaoCartolaPorIds(this.tempArrayObj)
        .subscribe(
          (value) => {

            this.retBilheteService = value;

            this.idBilheteUsuario = this.retBilheteService.idBilhete;
            this.codigoBilhete = this.retBilheteService.codigoBilhete;


            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              ' Time(s) cadastrado(s) com sucesso!',
              '',
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'right'
              }
            );
          },
          (erro) => {

            if (erro.status && erro.status === 409) {
              this.toastr.info(
                '<span class="now-ui-icons ui-1_bell-53"></span>' +
                'Solcita????o n??o foi gerada, Time j?? cadastrado!',
                '',
                {
                  timeOut: 8000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: 'alert alert-info alert-with-icon',
                  positionClass: 'toast-' + 'top' + '-' + 'right'
                }
              );
            } else {
              this.toastr.info(
                '<span class="now-ui-icons ui-1_bell-53"></span>' +
                ' N??o foi poss??vel gerar a solicita????o!',
                '',
                {
                  timeOut: 8000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: 'alert alert-info alert-with-icon',
                  positionClass: 'toast-' + 'top' + '-' + 'right'
                }
              );
            }
          });
    }

  }

  listarTimesPorNome(nomeTime: string) {

    const nomeTimeSemAcento = nomeTime.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    this.listarTimesCartola.listarTimesCartola(nomeTimeSemAcento)
      .toPromise()
      .then((listaTimes: []) => {
        // .subscribe((listaTimes: []) => {
        this.timesLigaCartola = listaTimes;
      });
  }

  excluirTimeUsuario(timeUsuario: HistoricoTimeUsuario): void {
    swal({
      title: 'Excluir',
      text: 'Deseja excluir esse time?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'N??o',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.excluirTimeBilheteService.excluirTimeBilhete(this.idBilheteUsuario, timeUsuario.time_id)
          .subscribe(
            () => {
              swal({
                title: 'Exclu??da!',
                text: 'Time Exclu??do com sucesso.',
                type: 'success',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
              }).catch(swal.noop);
              this.recuperarListaTimeBilhete();
            },
            (erro) => {
              if (erro.status && erro.status === 404) {
                swal({
                  title: 'Exclus??o n??o efetuada',
                  text: 'registro inexistente :)',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info',
                  buttonsStyling: false
                }).catch(swal.noop);
              } else {
                swal({
                  title: 'Exclus??o n??o efetuada',
                  text: 'N??o foi poss??vel realizar a Exclus??o :)',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info',
                  buttonsStyling: false
                }).catch(swal.noop);
              }
            }
          );
      } else {
        swal({
          title: 'Cancelado',
          text: 'Exclus??o cancelada :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }

  excluirBilhete(idBilhte: number): void {
    swal({
      title: 'Excluir',
      text: 'Deseja excluir esse bilhete?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'N??o',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.excluirBilheteService.excluirBilhete(idBilhte)
          .subscribe(
            () => {
              swal({
                title: 'Exclu??do!',
                text: 'Bilhete Exclu??do com sucesso.',
                type: 'success',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
              }).catch(swal.noop);
              this.limpar();
            },
            (erro) => {
              if (erro.status && erro.status === 404) {
                swal({
                  title: 'Exclus??o n??o efetuada',
                  text: 'registro inexistente :)',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info',
                  buttonsStyling: false
                }).catch(swal.noop);
              } else {
                swal({
                  title: 'Exclus??o n??o efetuada',
                  text: 'N??o foi poss??vel realizar a Exclus??o :)',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info',
                  buttonsStyling: false
                }).catch(swal.noop);
              }
            }
          );
      } else {
        swal({
          title: 'Cancelado',
          text: 'Exclus??o cancelada :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }

  gerarBilheteUsuario(time: TimeLigaCartola): void {
    for (let i = 0; i < this.timesLigaCartola.length; i++) {
      if (time.time_id === this.timesLigaCartola[i].time_id) {

        if (this.idBilheteUsuario === 0) {
          this.bilhete.idBilhete = 0;
        } else {
          this.bilhete.idBilhete = this.idBilheteUsuario;
        }

        this.bilhete.nomeUsuario = this.timesLigaCartola[0].nome_cartola;
        this.bilhete.nrContatoUsuario = this.formulario.get('contato').value;
        this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola;

        this.bilhete.time_id = time.time_id;
        this.bilhete.assinante = this.timesLigaCartola[i].assinante;
        this.bilhete.foto_perfil = this.timesLigaCartola[i].foto_perfil;
        this.bilhete.nome = this.timesLigaCartola[i].nome;
        this.bilhete.nome_cartola = this.timesLigaCartola[i].nome_cartola;
        this.bilhete.slug = this.timesLigaCartola[i].slug;
        this.bilhete.url_escudo_png = this.timesLigaCartola[i].url_escudo_png;
        this.bilhete.url_escudo_svg = this.timesLigaCartola[i].url_escudo_svg;
        this.bilhete.facebook_id = this.timesLigaCartola[i].facebook_id;

        this.gerarBilhete.gerarBilheteCompeticaoCartola(this.bilhete)
          .subscribe(
            (value) => {
              this.retBilheteService = value;
              this.idBilheteUsuario = this.retBilheteService.idBilhete;
              this.codigoBilhete = this.retBilheteService.codigoBilhete;
              this.timesLigaCartola[i].inPoint = true;
              this.toastr.success(
                '<span class="now-ui-icons ui-1_bell-53"></span>' +
                ' Time cadastrado com sucesso!',
                '',
                {
                  timeOut: 8000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: 'alert alert-success alert-with-icon',
                  positionClass: 'toast-' + 'top' + '-' + 'right'
                }
              );
            },
            (erro) => {

              if (erro.status && erro.status === 409) {
                this.toastr.info(
                  '<span class="now-ui-icons ui-1_bell-53"></span>' +
                  'Solcita????o n??o foi gerada, Time j?? cadastrado!',
                  '',
                  {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: 'alert alert-info alert-with-icon',
                    positionClass: 'toast-' + 'top' + '-' + 'right'
                  }
                );
              } else {
                this.toastr.info(
                  '<span class="now-ui-icons ui-1_bell-53"></span>' +
                  ' N??o foi poss??vel gerar a solicita????o!',
                  '',
                  {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: 'alert alert-info alert-with-icon',
                    positionClass: 'toast-' + 'top' + '-' + 'right'
                  }
                );
              }
            });
      }
    }
  }

  finalizarInscricao(): void {

    let valorBilhete = this.count * this.competicaoRodada.valorCompeticao;
    this.bilhete.idBilhete = this.idBilheteUsuario;
    this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola;
    this.bilhete.nomeUsuario = this.nome;
    this.bilhete.statusAtualBilhete = 'Finalizado';

    this.atualizarStatusPagamento.alterarStatusBilhete(this.bilhete)
      .toPromise()
      .then(() => {
        //  .subscribe(() => {
        swal({
          title: "Solicita????o: " + this.bilhete.idBilhete,
          text: "Para validar, envie esse n??mero para o ADM da liga!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success",
          footer: "Valor: " + valorBilhete + "R$"
        }).catch(swal.noop);

      });

    this.limpar();

  }


  favorito(): void {

    const modalRef = this.modalService.open(ModalTimesFavoritosComponent,
      {
        scrollable: true,
        windowClass: 'modal-job-scrollable'
      });

    const data = {
      contato: this.formulario.get('contato').value,
      idBilheteUsuario: this.idBilheteUsuario,
      nrSequencialRodadaCartola: this.competicaoRodada.nrSequencialRodadaCartola
    }
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      result => {

        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });



  }






}
