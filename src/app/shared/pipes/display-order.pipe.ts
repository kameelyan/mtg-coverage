import { Pipe, PipeTransform } from '@angular/core';
import { Info } from '../classes/tournament';

@Pipe({
  name: 'displayOrder'
})
export class DisplayOrderPipe implements PipeTransform {

  transform(infos: Info[]): any {
      infos.sort((a: Info, b: Info) => {
          return a.order - b.order;
      });
      return infos;
  }

}
