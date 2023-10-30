import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nuevosClientes } from 'src/app/Types/NuevosClientes';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AgregarVariosClientesService {

  constructor(private http:HttpClient) { }

  //CAMBIAR LA URL LUEGO POR EL BASEURL
  public subirArchivo(file:any, delimitante:string, username:string){
    return this.http.post(`http://192.168.1.171:8005/api/v1/validations/file?delimitante=${delimitante}&username=${username}`, file)
  }

  public guardarArchivo(clientes:nuevosClientes[]){
    return this.http.post(`http://192.168.1.171:8004/api/v1/clientes/multiplesClientes`, clientes)
  }


}


