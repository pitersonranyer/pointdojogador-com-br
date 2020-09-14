import { Component, OnInit } from '@angular/core';
import { TimesService } from '../services/times.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public times = [] ;
  

  constructor(private timesService: TimesService) { }

  ngOnInit() {

    this.timesService.listartimes().subscribe(data => {
      this.times = data;
    });
  }

}
