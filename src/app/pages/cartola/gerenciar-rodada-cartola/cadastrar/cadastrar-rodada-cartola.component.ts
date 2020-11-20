import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar-rodada-cartola',
  templateUrl: './cadastrar-rodada-cartola.component.html',
  styleUrls: ['./cadastrar-rodada-cartola.component.css']
})
export class CadastrarRodadaCartolaComponent implements OnInit {

  public rodadaCartola: RodadaCartola = <RodadaCartola>{};

  constructor(private cadastrarRodadaCartola: CartolaAPIService,
        private router: Router,
        private toastr: ToastrService) { }

  ngOnInit() {

  }

  onSubmit() {

    swal({
      title: 'Cadastrar',
      text: 'Deseja cadastrar essa Rodada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.cadastrarRodadaCartola.cadastrarRodadaCartola (this.rodadaCartola).subscribe(
          () => {
            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              ' Rodada Cadastrada com sucesso!',
              '',
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'right'
              }
            );
            this.router.navigate(['/cartola/listarRodadaCartola']);
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
}
