
import { Directive, ElementRef, Renderer2, Input, HostListener, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[telefone]'
})
export class TelefoneDirective implements OnInit {

  private elemento: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.elemento = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.elemento.value = this.formatarTelefone(this.elemento.value);
  }

  @HostListener('onchange', ['$event.target.value'])
  onChange(valor: string) {
    console.log('teste', valor);
    this.elemento.value = this.formatarTelefone(valor);
  }

  formatarTelefone(telefone: string): string {
    if (telefone.length === 1) {
      return '(' + telefone;
    }

    if (telefone.length === 2) {
      return '(' + telefone + ')';
    }
    return '';
  }
}
