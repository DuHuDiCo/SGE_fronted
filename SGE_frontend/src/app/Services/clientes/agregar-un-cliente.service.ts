import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AgregarUnClienteService {

  constructor(private http:HttpClient) { }

  public guardarClientes(guardarClientes: any){
    return this.http.post(`http://192.168.1.171:8004/api/v1/clientes/save`, guardarClientes)
  }
}
