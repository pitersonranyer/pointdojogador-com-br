import { Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[centro]'
})
export class CentroDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'textAlign',
      'center'
    );
  }

}
