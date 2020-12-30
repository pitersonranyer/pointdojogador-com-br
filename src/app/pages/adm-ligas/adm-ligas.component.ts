import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Liga } from 'src/app/interfaces/liga';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adm-ligas',
  templateUrl: './adm-ligas.component.html',
  styleUrls: ['./adm-ligas.component.css']
})
export class AdmLigasComponent implements OnInit {

  ligas = [];

  public totalParticipantes = 0;
  public premiacaoTotal = 0;
  public premiacaoPercentual = 0;
  public premiacaoFinal = 0;
  public premiacaoFinalFormat = '';

  dataFim: string;
  horaFim: string;

  count: number;

  public liga: Liga = <Liga>{};
  
  usuario$: Observable<Usuario>;
  usuario: Usuario;

  constructor(private router: Router,
    private listarLigasAdms: CartolaAPIService,
    private cadastrarLiga: CartolaAPIService,
    private excluirLigaCartola: CartolaAPIService,
    public usuarioService: UsuarioService,
    private toastr: ToastrService) {
    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);
  }

  ngOnInit() {

    this.listarLigasAdms.listarLigasAdms(this.usuario.id).subscribe((ligas: any[]) => {
      this.ligas = ligas;
      for (let i = 0; i < this.ligas.length; i++) {
        this.count = 0;
        // AJUSTAR CONTADOR
        this.ligas[i].totalParticipantes = 10;
        this.premiacaoTotal = this.ligas[i].totalParticipantes * this.ligas[i].valorLiga;
        this.premiacaoPercentual = (this.premiacaoTotal * 10) / 100;
        this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;

        this.ligas[i].premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        this.ligas[i].dataFim = this.ligas[i].dtFimInscricao.substring(0, 5);
        this.ligas[i].horaFim = this.ligas[i].hrFimInscricao.substring(0, 5);
      }
    });

  }

  onSubmit() {

    swal({
      title: 'Cadastrar',
      text: 'Deseja cadastrar essa Liga?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.liga.anoTemporada = 2020;
        this.liga.idUsuarioAdmLiga = this.usuario.id;
        this.liga.tipoLiga =  'Tiro Curto';
        this.cadastrarLiga.cadastrarLiga(this.liga).subscribe(
          () => {
            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              ' Liga Cadastrada com sucesso!',
              '',
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'right'
              }
            );
            this.ngOnInit();
          },
          (erro) => {
            if (erro.status && erro.status === 409) {
              swal({
                title: 'Cadastro não efetuado',
                text: 'registro existente :)',
                type: 'error',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              }).catch(swal.noop);
            } else {
              swal({
                title: 'Cadastro não efetuado',
                text: 'Não foi possível realizar a alteração :)',
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
          text: 'Alteração cancelada :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }


  gerenciarLiga() {
    this.router.navigate(['/adm-ligas/gerenciarLiga']);
  }


  excluirLiga(liga: Liga) {
    swal({
      title: 'Excluir',
      text: 'Deseja excluir essa Liga?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        
        this.excluirLigaCartola.excluirLiga(liga.anoTemporada, liga.idRodada, liga.idUsuarioAdmLiga, liga.idLiga)
        .subscribe(
          () => {
            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              ' Liga excluída com sucesso!',
              '',
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'right'
              }
            );
            this.ngOnInit();
          },
          (erro) => {
            if (erro.status && erro.status === 409) {
              swal({
                title: 'Exclusão não efetuada',
                text: 'registro existente :(',
                type: 'error',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              }).catch(swal.noop);
            } else {
              swal({
                title: 'Exclusão não efetuada',
                text: 'Não foi possível realizar a exclusão :)',
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
