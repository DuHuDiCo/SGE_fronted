import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CuentasCobrarService {

  constructor(private http:HttpClient) { }

  public proSubject = new Subject<boolean>();

  getCuentasCobrar(username:string, page:number, size:number, fechaCreacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/cuentas/cuentasCobrar?username=${username}&page=${page}&size=${size}&fechaCreacion=${fechaCreacion}`)
  }

  getCuentaByObligacion(numeroObligacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/cuentas/getCuentaCobrarByNumeroObligacion?numeroObligacion=${numeroObligacion}`)
  }
}
