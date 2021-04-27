import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { HistoricoTimeUsuario } from 'src/app/interfaces/historicoTimeUsuario';
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

  constructor(private listarTimesUsuario: CartolaAPIService, 
    private excluirTime: CartolaAPIService,
    private modalService: NgbModal,
    private route: ActivatedRoute) { }

  ngOnInit() {

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

    console.log(this.competicaoRodada);

    this.results$ = this.formulario.get('contato').valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 3),
        debounceTime(200),
        switchMap(value => this.listarTimesUsuario.listarHistoricoTimesUsuario(value),
        ),
        tap((res: HistoricoTimeUsuario) => Object.keys(res)
          .forEach(value => {
            this.arrayTimesUsuario = [];
            const timeUsuario = {
              nrSeqTime: res[value].nrSeqTime,
              nrContatoUsuario: res[value].nrContatoUsuario,
              nomeUsuario: res[value].nomeUsuario
            };
            this.arrayTimesUsuario.push(timeUsuario);
            this.formulario.get('nome').setValue(this.arrayTimesUsuario[0].nomeUsuario);
            this.isReadOnly = true;
          })),

      );

  }

 
  recuperarHistoricoTimesUsuario() { 
    this.results$ =  this.listarTimesUsuario.listarHistoricoTimesUsuario(this.formulario.get('contato').value)
   }
  
   

  limpar() {
    this.isReadOnly = false;
    this.formulario.reset();
    this.ngOnInit();
  }


  showModalAddTimes(content) {

  //  console.log(this.formulario.get('nome').value);
  //  console.log(this.formulario.get('contato').value);
  //  console.log(this.formulario.valid);
  //  if (this.formulario.valid) {
  //    this.isReadOnly = true;
  //  }

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
        this.excluirTime.excluirTimeUsuario(timeUsuario.time_id)
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

}
