import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    const date = new Date(value)

    const dateString = date.toISOString().split("-")
    var dia = dateString[2].split("T")[0]
    var mes = dateString[1]
    var year = dateString[0]
    var hora = (date.getHours()).toString()
    var minute = date.getMinutes().toString()
    var segundo = date.getSeconds().toString()
    
    
    
    dia = (dia.length == 1 ? `0${dia}` : dia)
   

    mes = mes.length == 1 ? `0${mes}` : mes
    year = year.length == 1 ? `0${year}` : year
    hora = hora.length == 1 ? `0${hora}` : hora
    minute = minute.length == 1 ? `0${minute}` : minute
    segundo = segundo.length == 1 ? `0${segundo}` : segundo


    if(hora == null || hora == undefined || hora == "" || hora == '00' || minute == null || minute == undefined || minute == "" || minute == '00'
    || segundo == null || segundo == undefined || segundo == ""  || segundo == '00'){
      return `${dia}/${mes}/${year}`  
    }

    return `${dia}/${mes}/${year} ${hora}:${minute}:${segundo}`
  }

}
