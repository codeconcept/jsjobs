import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate'
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    if(value.toLowerCase() === 'asap') {
      return 'dès que possible';
    } else if(value.indexOf('-') > -1) {
      let fullDate, rest;
      // to handle a date with this format '2017-06-07T17:12:24.162Z' for June 6th 2017
      [fullDate, rest] = value.toLowerCase().split('t');

      let year, month, date;
      [year, month, date] = fullDate.split('-');  

      return `${date}/${month}/${year}`;
    } else {
      return '--';
    }
  }

}
