import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-mensageria',
  templateUrl: './mensageria.component.html'
})

export class MensageriaComponent {

  @Input() processamento = false;
  @Input() mensagensFixas: Message[] = [];

}
