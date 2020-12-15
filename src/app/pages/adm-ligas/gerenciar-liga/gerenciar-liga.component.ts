import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';

@Component({
  selector: 'app-gerenciar-liga',
  templateUrl: './gerenciar-liga.component.html',
  styleUrls: ['./gerenciar-liga.component.css']
})
export class GerenciarLigaComponent implements OnInit {
  closeResult: string;
  // timesCartola = [];
  timesCartola: Array<TimeCartola> = [];
  nomeTimePsq = '';
  codigo = '';

  constructor(private modalService: NgbModal,
    private listarTimesCartola: CartolaAPIService,) {}

  ngOnInit() {
    this.timesCartola = [];
    this.nomeTimePsq = '';
    this.codigo = '';
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  listarTimesPorNome(nomeTime: string) {
    this.listarTimesCartola.listarTimesCartola(nomeTime).subscribe((listaTimes: []) => {
      this.timesCartola = listaTimes;
    });
  }

  cadastrarTimeCartola(time: TimeCartola): void {
    for (let i = 0; i < this.timesCartola.length; i++) {
      if (time.time_id === this.timesCartola[i].time_id) {
        this.timesCartola[i].inPoint = true;
      }
    }
  }
}
