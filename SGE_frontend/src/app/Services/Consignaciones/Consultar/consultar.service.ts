import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Consignacion, ObservacionDto } from 'src/app/Types/Consignaciones';

@Injectable({
  providedIn: 'root'
})
export class ConsultarService {

  constructor(private http:HttpClient) { }

  public proSubject = new Subject<boolean>();

  url = 'http://192.168.1.183:8007/api/v1'

  getAllConsignaciones(estado:string, page:number, size:number){
    return this.http.get(`${this.url}/consignacion/getAllConsignaciones?estado=${estado}&page=${page}&size=${size}`)
  }

  getConsignacionById(id:number){
    return this.http.get(`${this.url}/consignacion/getConsignacionById/${id}`)
  }

  updateConsignacion(consignacion:Consignacion){
    return this.http.put(`${this.url}/consignacion/editarConsignacion`, consignacion)
  }

  saveObservacion(observacion:ObservacionDto){
    return this.http.post(`${this.url}/observacion/save`, observacion)
  }

  filter(estado:string, fecha:string, sede:string, page:number, size:number){
    return this.http.get(`${this.url}/consignacion/filtrarConsignaciones?estado=${estado}&fecha=${fecha}&sede=${sede}&page=${page}&size=${size}`)
  }

  getAllSede(){
    return this.http.get(`http://192.168.1.241:8006/api/v1/sede/getAllSedes`)
  }

  getConsignacionByCedula(cedula:string){
    return this.http.get(`${this.url}/consignacion/getConsignacionByCliente/${cedula}`)
  }

  cambiarEstadoConsignacion(cambioEstado:any){
    return this.http.put(`${this.url}/consignacion/changeEstadoOfConsignacionToComprobadas`, cambioEstado)
  }

  listarComprobados(username:string, page:number, size:number){
    return this.http.get(`${this.url}/consignacion/consignacionesComprobadas?username=${username}&page=${page}&size=${size}`)
  }

  isSelected(selected:any){
    return this.http.put(`${this.url}/consignacion/isSelectedConsignacion`, selected)
  }

}
