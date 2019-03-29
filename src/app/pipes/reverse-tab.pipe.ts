import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'reverseTab'})
export class ReverseTabPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value ? value.reverse() : value;
  }
}
