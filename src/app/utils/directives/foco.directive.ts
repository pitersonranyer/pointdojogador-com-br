import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[foco]'
})
export class FocoDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}

