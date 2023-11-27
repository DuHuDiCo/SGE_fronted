import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CuentasCobrarService {

  constructor(private http:HttpClient) { }

  getCuentasCobrar(username:string, page:number, size:number, fechaCreacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/cuentas/cuentasCobrar?username=${username}&page=${page}&size=${size}&fechaCreacion=${fechaCreacion}`)
  }
}
