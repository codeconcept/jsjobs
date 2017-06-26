import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, limit = 15, end = '…'): any {
    let shortenedValue = '';

    if (value) {
      let words = value.split(/\s+/);
      if (words.length > limit){
        shortenedValue = words.slice(0, limit).join(' ') + end;
      } else {
        shortenedValue = value;
      }
    } 
    
    return shortenedValue;
  } 

}
