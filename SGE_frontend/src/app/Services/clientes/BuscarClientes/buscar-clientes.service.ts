import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class BuscarClientesService {

  constructor(private http:HttpClient) { }

  public listarClientes(){
    return this.http.get(`${baseUrl}/clientes/all`)
  }

  public filtrarClientes(cedula:string){
    return this.http.get(`${baseUrl}/clientes/find/${cedula}`)
  }

  public eliminarCliente(idCliente: Number, username:string | null){
    return this.http.delete(`${baseUrl}/clientes/delete/${idCliente}/?username=${username}`)
  }
}
