import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'button[botao]'
})
export class BotaoDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'width',
      '110px'
    );
  }

}
