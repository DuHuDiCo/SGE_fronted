import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign } from 'src/app/Types/PanelCartera/campaign';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  url = 'http://192.168.1.241:8030/api/v1'

  constructor(private http: HttpClient) { }

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

  deleteCuentas() {
    return this.http.delete(`${this.url}/cuentas/`)
  }

  asignarcuentas(idTipoAsignacion:number, asignacion: any) {
    return this.http.put(`${this.url}/cuentas/asignacion/?idTipoAsignacion=${idTipoAsignacion}`, asignacion)
    
  }

  // ASESORES
  getAsesores(idRol:number, idPermiso:number) {
    return this.http.get(`${this.url}/asesores/?idRol=${idRol}&idPermiso=${idPermiso}`)
  }

}
