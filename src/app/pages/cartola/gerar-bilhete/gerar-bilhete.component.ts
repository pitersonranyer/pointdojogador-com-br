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
  porId   = false;
  porNome = false;



  constructor(private listarTimeBilheteService: CartolaAPIService,
    private excluirTimeBilheteService: CartolaAPIService,
    private excluirBilheteService: CartolaAPIService,
    private listarTimesCartola: CartolaAPIService,
    private consultarTimeInfoCartolaById: CartolaAPIService,
    private gerarBilhete: CartolaAPIService,
    private cadastrarTimeBilheteService: CartolaAPIService,
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
        'CÓDIGO INVÁLIDO</b>' +
        ' - Informe os códigos conforme Ex: id1;id2;id3',
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

      this.bilhete.idBilhete = 0;
      this.bilhete.nomeUsuario = 'Sistema';
      this.bilhete.nrContatoUsuario = this.formulario.get('contato').value;
      this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

      this.gerarBilhete.gerarBilheteCompeticaoCartola(this.bilhete)
        .subscribe((value: any) => {
          this.idBilheteUsuario = value.idBilhete;
          this.codigoBilhete = value.codigoBilhete;

          for (let i = 0; i < arraySlugs.length; i++) {
            this.consultarTimeInfoCartolaById.consultarTimeCartola(arraySlugs[i]).subscribe((data) => {
              this.timeBilhete = data.time;
              this.timeBilhete.idBilhete = this.idBilheteUsuario;
              this.timeBilhete.nomeUsuario = 'Sistema';
              this.timeBilhete.nrContatoUsuario = this.formulario.get('contato').value;
              this.timeBilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

              this.cadastrarTimeBilheteService.cadastrarTimeBilheteCompeticaoCartola(this.timeBilhete)
                .subscribe(() => {
                });
            });
          }
        });

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

    }

  }

  listarTimesPorNome(nomeTime: string) {

    var nomeTimeSemAcento = nomeTime.normalize("NFD");

    this.listarTimesCartola.listarTimesCartola(nomeTimeSemAcento).subscribe((listaTimes: []) => {
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
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.excluirTimeBilheteService.excluirTimeBilhete(this.idBilheteUsuario, timeUsuario.time_id)
          .subscribe(
            () => {
              swal({
                title: 'Excluída!',
                text: 'Time Excluído com sucesso.',
                type: 'success',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
              }).catch(swal.noop);
              this.recuperarListaTimeBilhete();
            },
            (erro) => {
              if (erro.status && erro.status === 404) {
                swal({
                  title: 'Exclusão não efetuada',
                  text: 'registro inexistente :)',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info',
                  buttonsStyling: false
                }).catch(swal.noop);
              } else {
                swal({
                  title: 'Exclusão não efetuada',
                  text: 'Não foi possível realizar a Exclusão :)',
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
          text: 'Exclusão cancelada :)',
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
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.excluirBilheteService.excluirBilhete(idBilhte)
          .subscribe(
            () => {
              swal({
                title: 'Excluído!',
                text: 'Bilhete Excluído com sucesso.',
                type: 'success',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
              }).catch(swal.noop);
              this.limpar();
            },
            (erro) => {
              if (erro.status && erro.status === 404) {
                swal({
                  title: 'Exclusão não efetuada',
                  text: 'registro inexistente :)',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info',
                  buttonsStyling: false
                }).catch(swal.noop);
              } else {
                swal({
                  title: 'Exclusão não efetuada',
                  text: 'Não foi possível realizar a Exclusão :)',
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
          text: 'Exclusão cancelada :)',
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
          this.bilhete.nomeUsuario = this.timesLigaCartola[0].nome_cartola;
          this.bilhete.nrContatoUsuario = this.formulario.get('contato').value;
          this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola
          this.gerarBilhete.gerarBilheteCompeticaoCartola(this.bilhete)

            .subscribe((value: any) => {
              this.idBilheteUsuario = value.idBilhete;
              this.codigoBilhete = value.codigoBilhete;

              this.timeBilhete.idBilhete = this.idBilheteUsuario;
              this.timeBilhete.nomeUsuario = this.timesLigaCartola[0].nome_cartola;
              this.timeBilhete.nrContatoUsuario = this.formulario.get('contato').value;
              this.timeBilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

              this.timeBilhete.time_id = this.timesLigaCartola[i].time_id;
              this.timeBilhete.assinante = this.timesLigaCartola[i].assinante;
              this.timeBilhete.foto_perfil = this.timesLigaCartola[i].foto_perfil;
              this.timeBilhete.nome = this.timesLigaCartola[i].nome;
              this.timeBilhete.nome_cartola = this.timesLigaCartola[i].nome_cartola;
              this.timeBilhete.slug = this.timesLigaCartola[i].slug;
              this.timeBilhete.url_escudo_png = this.timesLigaCartola[i].url_escudo_png;
              this.timeBilhete.url_escudo_svg = this.timesLigaCartola[i].url_escudo_svg;
              this.timeBilhete.facebook_id = this.timesLigaCartola[i].facebook_id;

              this.cadastrarTimeBilheteService.cadastrarTimeBilheteCompeticaoCartola(this.timeBilhete)
                .subscribe(
                  () => {
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
                    this.timesLigaCartola[i].inPoint = true;
                  },
                  (erro) => {

                    if (erro.status && erro.status === 409) {
                      this.toastr.info(
                        '<span class="now-ui-icons ui-1_bell-53"></span>' +
                        ' Time já cadastrado!',
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
                        ' Não foi possível realizar o cadastro do time!',
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
            });
        } else {
          this.timeBilhete.idBilhete = this.idBilheteUsuario;
          this.timeBilhete.nomeUsuario = this.nome;
          this.timeBilhete.nrContatoUsuario = this.formulario.get('contato').value;
          this.timeBilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

          this.timeBilhete.time_id = this.timesLigaCartola[i].time_id;
          this.timeBilhete.assinante = this.timesLigaCartola[i].assinante;
          this.timeBilhete.foto_perfil = this.timesLigaCartola[i].foto_perfil;
          this.timeBilhete.nome = this.timesLigaCartola[i].nome;
          this.timeBilhete.nome_cartola = this.timesLigaCartola[i].nome_cartola;
          this.timeBilhete.slug = this.timesLigaCartola[i].slug;
          this.timeBilhete.url_escudo_png = this.timesLigaCartola[i].url_escudo_png;
          this.timeBilhete.url_escudo_svg = this.timesLigaCartola[i].url_escudo_svg;
          this.timeBilhete.facebook_id = this.timesLigaCartola[i].facebook_id;

          this.cadastrarTimeBilheteService.cadastrarTimeBilheteCompeticaoCartola(this.timeBilhete)
            .subscribe(
              () => {
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
                this.timesLigaCartola[i].inPoint = true;
              },
              (erro) => {

                if (erro.status && erro.status === 409) {
                  this.toastr.info(
                    '<span class="now-ui-icons ui-1_bell-53"></span>' +
                    ' Time já cadastrado!',
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
                    ' Não foi possível realizar o cadastro do time!',
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
  }

  finalizarInscricao(): void {

    let valorBilhete = this.count * this.competicaoRodada.valorCompeticao;
    this.bilhete.idBilhete = this.idBilheteUsuario;
    this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola;
    this.bilhete.nomeUsuario = this.nome;
    this.bilhete.statusAtualBilhete = 'Finalizado';

    this.atualizarStatusPagamento.alterarStatusBilhete(this.bilhete).subscribe(
      () => {
        swal({
          title: "Solicitação: " + this.bilhete.idBilhete,
          text: "Para validar, envie esse número para o ADM da liga!",
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
