import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngElse]'
})
export class NgElseDirective {

  constructor(private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef) { }

  private _naoVisto = true;

  @Input() set ngElse(condicao: boolean) {
    if (!condicao && this._naoVisto) {
      this._naoVisto = false;
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else if (condicao && !this._naoVisto) {
      this._naoVisto = true;
      this._viewContainerRef.clear();
    }
  }


}
