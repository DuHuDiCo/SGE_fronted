import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
   console.log(value);
   

    return format(value, 'dd/MM/yyyy hh:mm a');
  }

}
