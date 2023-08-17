import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nuevosClientes } from 'src/app/Types/NuevosClientes';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AgregarVariosClientesService {

  constructor(private http:HttpClient) { }

  public subirArchivo(file:any, delimitante:string, username:string){
    return this.http.post(`${baseUrl}/validations/file?delimitante=${delimitante}&username=${username}`, file)
  }

  public guardarArchivo(clientes:nuevosClientes[]){
    return this.http.post(`${baseUrl}/validations/data`, clientes)
  }


}


