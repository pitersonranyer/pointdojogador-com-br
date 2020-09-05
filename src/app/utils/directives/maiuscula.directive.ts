
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[maiuscula]'
})
export class MaiusculaDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'textTransform',
      'uppercase'
    );
  }

}
