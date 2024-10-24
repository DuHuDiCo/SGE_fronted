import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatosContacto } from 'src/app/Types/DatosCliente';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class BuscarClientesService {


  public proSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  Url = "http://192.168.1.171:8004/api/v1";

  public listarClientes(page:number, size:number){
    return this.http.get(`${baseUrl}/clientes/all?page=${page}&size=${size}`)
  }

  public filtrarClientes(cedula:string){
    return this.http.get(`${baseUrl}/clientes/find/${cedula}`)
  }

  public eliminarCliente(idCliente: Number, username:string | null){
    return this.http.delete(`${baseUrl}/clientes/delete/${idCliente}?username=${username}`)
  }

  public updateDatos(datos:DatosContacto){
    return this.http.put(`${baseUrl}/clientes/updateDatosContacto`, datos)
  }

  listarDepartamentos(){
    return this.http.get(`https://api-colombia.com/api/v1/Department/`)
  }

  listarCiudadByDepartamento(id:number){
    return this.http.get(`https://api-colombia.com/api/v1/Department/${id}/cities`)
  }
}
