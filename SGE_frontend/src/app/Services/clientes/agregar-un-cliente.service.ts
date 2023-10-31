import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AgregarUnClienteService {

  constructor(private http:HttpClient) { }

  public guardarClientes(guardarClientes: any){
    return this.http.post(`${baseUrl}/clientes/save`, guardarClientes)
  }
}
