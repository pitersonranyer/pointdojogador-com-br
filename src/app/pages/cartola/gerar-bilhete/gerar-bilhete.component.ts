import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BilheteCompeticaoCartola } from 'src/app/interfaces/bilheteCompeticaoCartola';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { HistoricoTimeUsuario } from 'src/app/interfaces/historicoTimeUsuario';
import { TimeBilheteCompeticaoCartola } from 'src/app/interfaces/timeBilheteCompeticaoCartola';
import { TimeLigaCartola } from 'src/app/interfaces/timeLigaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-gerar-bilhete',
  templateUrl: './gerar-bilhete.component.html',
  styleUrls: ['./gerar-bilhete.component.css']
})
export class GerarBilheteComponent implements OnInit {

  timesUsuario = [];
  isReadOnly = false;
  closeResult: string;

  nome = ''

  competicaoRodada: CompeticaoCartola = <CompeticaoCartola>{};
  historicoTimeUsuario: HistoricoTimeUsuario = <HistoricoTimeUsuario>{};
  bilhete: BilheteCompeticaoCartola = <BilheteCompeticaoCartola>{};
  timeBilhete: TimeBilheteCompeticaoCartola = <TimeBilheteCompeticaoCartola>{};

  formulario = new FormGroup({
    contato: new FormControl(),
    nome: new FormControl('', [Validators.required]),

  })


  results$: Observable<any>;
  contato$: Observable<any>;

  arrayTimesUsuario = [];

  nomeTimePsq = '';
  nomeTimeBusca: string ;
  codigo = '';
  idBilheteUsuario = 0;

  timesLigaCartola = [];

  constructor(private listarTimeBilheteService: CartolaAPIService, 
    private excluirTimeBilheteService: CartolaAPIService,
    private listarTimesCartola: CartolaAPIService,
    private cadastrarHistoricoTimeUsuarioService: CartolaAPIService,
    private gerarBilhete: CartolaAPIService,
    private cadastrarTimeBilheteService: CartolaAPIService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.timesLigaCartola = [];

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


    this.results$ = this.formulario.get('contato').valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 3),
        debounceTime(200),
        switchMap(value => this.listarTimeBilheteService
          .listarTimeBilheteGerado(value, this.competicaoRodada.nrSequencialRodadaCartola),
        ),
        tap((res: any) => Object.keys(res)
          .forEach(value => {
            this.arrayTimesUsuario = [];
            const timeUsuario = {
              idBilhete: res[value].idBilhete,
              nomeUsuario: res[value].nomeUsuario,
              nrContatoUsuario: res[value].nrContatoUsuario,
              nrSequencialRodadaCartola: res[value].nrSequencialRodadaCartola,
              time_id: res[value].time_id
            };
            this.arrayTimesUsuario.push(timeUsuario);
            this.formulario.get('nome').setValue(this.arrayTimesUsuario[0].nomeUsuario);
            this.idBilheteUsuario = this.arrayTimesUsuario[0].idBilhete;
            this.isReadOnly = true;
          })),

      );

  }

 
  recuperarHistoricoTimesUsuario() { 
    this.results$ =  this.listarTimeBilheteService
    .listarTimeBilheteGerado(this.formulario.get('contato').value, this.competicaoRodada.nrSequencialRodadaCartola )
   }
  
   

  limpar() {
    this.isReadOnly = false;
    this.idBilheteUsuario = 0;
    this.formulario.reset();
    this.ngOnInit();
  }


  showModalAddTimes(content) {
    this.isReadOnly = true;
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
      this.recuperarHistoricoTimesUsuario();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.recuperarHistoricoTimesUsuario();
      return 'by clicking on a backdrop';
    } else {
      this.recuperarHistoricoTimesUsuario();
      return `with: ${reason}`;
    }
    
  }


  listarTimesPorId(id: string) {
    
  }

  listarTimesPorNome(nomeTime: string) {
    this.listarTimesCartola.listarTimesCartola(nomeTime).subscribe((listaTimes: []) => {
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
            this.recuperarHistoricoTimesUsuario();
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

  cadastrarTimeLigaCartola(time: TimeLigaCartola): void {
    for (let i = 0; i < this.timesLigaCartola.length; i++) {
      if (time.time_id === this.timesLigaCartola[i].time_id) {
        this.historicoTimeUsuario.nomeUsuario = this.formulario.get('nome').value;
        this.historicoTimeUsuario.nrContatoUsuario = this.formulario.get('contato').value;
        this.historicoTimeUsuario.time_id = this.timesLigaCartola[i].time_id;
        this.historicoTimeUsuario.foto_perfil = this.timesLigaCartola[i].foto_perfil;
        this.historicoTimeUsuario.nome = this.timesLigaCartola[i].nome;
        this.historicoTimeUsuario.nome_cartola = this.timesLigaCartola[i].nome_cartola;
        this.historicoTimeUsuario.slug = this.timesLigaCartola[i].slug;
        this.historicoTimeUsuario.url_escudo_png = this.timesLigaCartola[i].url_escudo_png;
        this.historicoTimeUsuario.url_escudo_svg = this.timesLigaCartola[i].url_escudo_svg;
        this.historicoTimeUsuario.facebook_id = this.timesLigaCartola[i].facebook_id;
        this.cadastrarHistoricoTimeUsuarioService.cadastrarHistoricoTimeUsuario(this.historicoTimeUsuario).subscribe(
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





  gerarBilheteUsuario(time: TimeLigaCartola): void {
    for (let i = 0; i < this.timesLigaCartola.length; i++) {
      if (time.time_id === this.timesLigaCartola[i].time_id) {
        this.bilhete.nomeUsuario = this.formulario.get('nome').value;
        this.bilhete.nrContatoUsuario = this.formulario.get('contato').value;
        this.bilhete.time_id = this.timesLigaCartola[i].time_id;
        this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

        this.bilhete.assinante = this.timesLigaCartola[i].assinante;
        this.bilhete.foto_perfil = this.timesLigaCartola[i].foto_perfil;
        this.bilhete.nome = this.timesLigaCartola[i].nome;
        this.bilhete.nome_cartola = this.timesLigaCartola[i].nome_cartola;
        this.bilhete.slug = this.timesLigaCartola[i].slug;
        this.bilhete.url_escudo_png = this.timesLigaCartola[i].url_escudo_png;
        this.bilhete.url_escudo_svg = this.timesLigaCartola[i].url_escudo_svg;
        this.bilhete.facebook_id = this.timesLigaCartola[i].facebook_id;

        if (this.idBilheteUsuario > 0){
          this.timeBilhete.idBilhete = this.idBilheteUsuario;
          this.timeBilhete.time_id = this.bilhete.time_id;
          this.timeBilhete.assinante = this.bilhete.assinante;
          this.timeBilhete.foto_perfil = this.bilhete.foto_perfil;
          this.timeBilhete.nome = this.bilhete.nome;
          this.timeBilhete.nome_cartola = this.bilhete.nome_cartola;
          this.timeBilhete.slug = this.bilhete.slug;
          this.timeBilhete.url_escudo_png = this.bilhete.url_escudo_png;
          this.timeBilhete.url_escudo_svg = this.bilhete.url_escudo_svg;
          this.timeBilhete.facebook_id = this.bilhete.facebook_id;
          this.cadastrarTimeBilheteService.cadastrarTimeBilheteCompeticaoCartola(this.timeBilhete).subscribe(
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
        }else{
          this.bilhete.idBilhete = 0;
          this.gerarBilhete.gerarBilheteCompeticaoCartola(this.bilhete).subscribe(
            (value: any) => {
              this.idBilheteUsuario = value;
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



}
