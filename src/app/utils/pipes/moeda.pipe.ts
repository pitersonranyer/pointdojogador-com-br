import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

@Pipe({ name: 'moeda' })
export class  MoedaPipe implements PipeTransform {

  private SEPARADOR_DECIMAL: string;
  private SEPARADOR_MILHAR: string;

  constructor() {
    this.SEPARADOR_DECIMAL = ',';
    this.SEPARADOR_MILHAR = '.';
  }

  transform(valor: number | string, fracaoTam: number = 2): string {
    let [ partInteira, partFrac = '' ] = (valor || '').toString()
      .split('.');

    partFrac = fracaoTam > 0
      ? this.SEPARADOR_DECIMAL + (partFrac + PADDING).substring(0, fracaoTam)
      : '';

    partInteira = partInteira.replace(/\B(?=(\d{3})+(?!\d))/g, this.SEPARADOR_MILHAR);

    return partInteira + partFrac;
  }

  parse(valor: string, fracaoTam: number = 2): string {
    let [ integer, fraction = '' ] = (valor || '').split(this.SEPARADOR_DECIMAL);

    integer = integer.replace(new RegExp(this.SEPARADOR_MILHAR, 'g'), '');

    fraction = parseInt(fraction, 10) > 0 && fracaoTam > 0
      ? this.SEPARADOR_DECIMAL + (fraction + PADDING).substring(0, fracaoTam)
      : '';

    return integer + fraction;
  }

}
