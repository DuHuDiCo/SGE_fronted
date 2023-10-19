import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url = 'http://192.168.1.183:8007/api/v1'

  constructor(private http:HttpClient) { }

  filtro(page:number, size:number, order:string, tipoReporte:string, username:string, fechaReporte:Date | null){
    return this.http.get(`${this.url}/filesReporte/filtrosFiles?page=${page}&size=${size}&order=${order}&tipoReporte=${tipoReporte}&username=${username}&fechaReporte=${fechaReporte}`)
  }
}
