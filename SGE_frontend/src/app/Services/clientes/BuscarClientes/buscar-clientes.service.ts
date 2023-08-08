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
}
