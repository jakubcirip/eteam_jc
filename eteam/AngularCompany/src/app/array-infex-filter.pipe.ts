import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayInfexFilter',
})
export class ArrayInfexFilterPipe implements PipeTransform {
  transform(value: any[], limit: number): any[] {
    const newArr = [];

    let i = 0;
    for (const v of value) {
      if (i < limit) {
        newArr.push(v);
      }
      i++;
    }
    return newArr;
  }
}
