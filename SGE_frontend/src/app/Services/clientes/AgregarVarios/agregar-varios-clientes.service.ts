import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AgregarVariosClientesService {

  constructor(private http:HttpClient) { }

  public subirArchivo(file:any, delimitante:string, username:string){
    return this.http.post(`${baseUrl}/validations/file?delimitante=${delimitante}&username=${username}`, file)
  }


}


