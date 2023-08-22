import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class BuscarClientesService {

  constructor(private http:HttpClient) { }

  Url = "http://192.168.1.171:8004/api/v1";

  public listarClientes(){
    return this.http.get(`${this.Url}/clientes/all`)
  }

  public filtrarClientes(cedula:string){
    return this.http.get(`${this.Url}/clientes/find/${cedula}`)
  }

  public eliminarCliente(idCliente: Number, username:string | null){
    return this.http.delete(`${this.Url}/clientes/delete/${idCliente}?username=${username}`)
  }
}
