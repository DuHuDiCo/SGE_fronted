import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Campaign } from 'src/app/Types/PanelCartera/campaign';


import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  url = 'http://192.168.1.241:8030/api/v1'



  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getParametros() {
    return this.http.get(`${this.url}/parametros/parametros`)
  }

  // CUENTAS  
  cuentas(username: string, parametros: any) {
    return this.http.post(`${this.url}/cuentas/?username=${username}`, parametros)
  }

  cuentasView(nameView: string, parametros: any) {
    return this.http.post(`${this.url}/cuentas/view?nameView=${nameView}`, parametros)
  }

  viewUpdate(query: string) {
    return this.http.post(`${this.url}/cuentas/viewupdate?query=${query}`, null)
  }

  createCampaign(parametros: Campaign) {
    return this.http.post(`${this.url}/cuentas/campaign`, parametros)
  }

  // ASESORES
  getAsesores() {
    return this.http.get(`${this.url}/asesores/`)
  }




}
