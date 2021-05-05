import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { TimeLigaCartola } from 'src/app/interfaces/timeLigaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';

@Component({
  selector: 'app-gerenciar-liga',
  templateUrl: './gerenciar-liga.component.html',
  styleUrls: ['./gerenciar-liga.component.css']
})
export class GerenciarLigaComponent implements OnInit {
  closeResult: string;
  // timesCartola = [];
  timesLigaCartola: Array<TimeLigaCartola> = [];
  nomeTimePsq = '';
  nomeTimeBusca: string ;
  codigo = '';
  parciais = [];
  times: TimeLigaCartola;

  time_id: number;
  

  constructor(private toastr: ToastrService,
    private modalService: NgbModal,
    private consultarTimeInfoCartolaById: CartolaAPIService,
    private listarTimesCartola: CartolaAPIService,
    private listarTimeLigaPorRodada: CartolaAPIService,
    private cadastrarTimesLigaService: CartolaAPIService) { }

  ngOnInit() {
    this.timesLigaCartola = [];
    this.nomeTimePsq = '';
    this.codigo = '';

    this.listarTimeLigaPorRodada.listarTimeLigaPorRodada(2021, 21, 1, 1 )
      .subscribe((resultParcial: any[]) => {
        this.parciais = resultParcial;
      });

  }

  open(content) {

    this.ngOnInit();

    this.modalService.open(content).result.then(
      result => {

        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

  }

   getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.ngOnInit();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.ngOnInit();
      return 'by clicking on a backdrop';
    } else {
      this.ngOnInit();
      return `with: ${reason}`;
    }
    
  }

  listarTimesPorNome(nomeTime: string) {
    this.listarTimesCartola.listarTimesCartola(nomeTime).subscribe((listaTimes: []) => {
      this.timesLigaCartola = listaTimes;
    });
  }

  cadastrarTimeLigaCartola(time: TimeLigaCartola): void {
    for (let i = 0; i < this.timesLigaCartola.length; i++) {
      if (time.time_id === this.timesLigaCartola[i].time_id) {
        time.idLiga = 1
        this.cadastrarTimesLigaService.cadastrarTimesLiga(time).subscribe(
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


  listarTimesPorId(id: string) {
    let arraySlugs = id.split(";").map(Number);;
    for (let i = 0; i < arraySlugs.length; i++) {
      this.time_id = arraySlugs[i];
      this.consultarTimeInfoCartolaById.consultarTimeCartola(this.time_id).subscribe((data) => {
        this.times = data.time;
        this.times.idLiga = 1
        this.cadastrarTimesLigaService.cadastrarTimesLiga(this.times)
        .subscribe(() => {

          });
            
      });
    }

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
