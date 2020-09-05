import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})

export class LimitPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const trail = '..';

    return value ? value.length > limit ? value.substring(0, limit) + trail : value : '';
  }
}

