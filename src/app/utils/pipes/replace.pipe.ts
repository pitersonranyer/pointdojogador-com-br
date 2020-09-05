import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})

export class ReplacePipe implements PipeTransform {
  transform(value: string, searchvalue: string, newvalue: string): string {
    if (value) {
      return value.replace(new RegExp(searchvalue, 'g'), newvalue);
    } else {
      return value;
    }
  }
}
