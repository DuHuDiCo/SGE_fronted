import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  public proSubject = new Subject<boolean>();

  url = 'http://192.168.1.183:8007/api/v1'

  constructor(private http:HttpClient) { }

  getAll(page:number, size:number, order:string){
    return this.http.get(`${baseUrl}/filesReporte/getAllFiles?page=${page}&size=${size}&order=${order}`)
  }

  filtro(page:number, size:number, order:string, tipoReporte:string, username:string, fechaReporte:string){
    return this.http.get(`${baseUrl}/filesReporte/filtrosFiles?page=${page}&size=${size}&order=${order}&tipoReporte=${tipoReporte}&username=${username}&fechaReporte=${fechaReporte}`)
  }

  getFilesByUsername(page:number, size:number, order:string, username:string){
    return this.http.get(`${baseUrl}/filesReporte/getFilesByUsername?page=${page}&size=${size}&order=${order}&username=${username}`)
  }
}
