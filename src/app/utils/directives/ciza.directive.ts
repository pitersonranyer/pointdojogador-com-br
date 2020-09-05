import { Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cinza]'
})
export class CinzaDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      '#EFF0F3'
    );
  }

}
