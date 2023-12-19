import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tarea, TareaUpdate } from 'src/app/Types/Cartera/Clasificacion-Tarea/Tarea';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentaCobrarCalculate } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { Gestion } from 'src/app/Types/Cartera/Gestion/Gestion';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CuentasCobrarService {

  // CUENTASPORCOBRAR

  constructor(private http:HttpClient) { }

  public proSubject = new Subject<boolean>();

  getCuentasCobrar(username:string, page:number, size:number, fechaCreacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/cuentas/cuentasCobrar?username=${username}&page=${page}&size=${size}&fechaCreacion=${fechaCreacion}`)
  }

  getCuentaByObligacion(numeroObligacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/cuentas/getCuentaCobrarByNumeroObligacion?numeroObligacion=${numeroObligacion}`)
  }

  getCuentaByCedula(cedula:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/cuentas/getCuentaCobrarByCedula?cedula=${cedula}`)
  }

  
  updateCuentaCobrar(cuentaCobrar:CuentaCobrarCalculate){
    return this.http.put(`http://192.168.1.6:8021/api/v1/cuentas/updateCuentaCobrarToCalculate`, cuentaCobrar)
  }

  // CLASIFICACIONES

  getClasificacion(){
    return this.http.get(`http://192.168.1.6:8021/api/v1/clasificacion/getClasificaciones`)
  }

  getClasificacionById(id:number){
    return this.http.get(`http://192.168.1.6:8021/api/v1/clasificacion/getClasificacionById/${id}`)
  }

  saveClasificacion(clasificacion:clasificacion){
    return this.http.post(`http://192.168.1.6:8021/api/v1/clasificacion/saveClasificacion`, clasificacion)
  }

  updateClasificacion(clasificacion:clasificacion){
    return this.http.put(`http://192.168.1.6:8021/api/v1/clasificacion/updateClasificacion`, clasificacion)
  }

  // GESTIONES

  getGestiones(numeroObligacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/gestiones/getGestionByNumObligacion/${numeroObligacion}`)
  }

  saveGestion(gestion:Gestion){
    return this.http.post(`http://192.168.1.6:8021/api/v1/gestiones/saveOneGestion`, gestion)
  }

  getLastDatoAdicional(numeroObligacion:string){
    return this.http.get(`http://192.168.1.6:8021/api/v1/gestiones/getLastDatoAdicionalGestion/${numeroObligacion}`)
  }

  desactivateAcuerdoPago(id:number){
    return this.http.put(`http://192.168.1.6:8021/api/v1/gestiones/desactivateAcuerdoPago/${id}`, null)
  }

  // CLASIFICACION TAREA
  getTareas(){
    return this.http.get(`http://192.168.1.6:8021/api/v1/clasificacionTarea/getClasificacionesTarea`)
  }

  tareasById(id:number){
    return this.http.get(`http://192.168.1.6:8021/api/v1/clasificacionTarea/getClasificacionTareaById/${id}`)
  }

  saveTareas(tarea:Tarea){
    return this.http.post(`http://192.168.1.6:8021/api/v1/clasificacionTarea/saveClasificacionTarea`, tarea)
  }

  updateTarea(tarea:TareaUpdate){
    return this.http.put(`http://192.168.1.6:8021/api/v1/clasificacionTarea/actualizarClasificacionTarea`, tarea)
  }

  deleteTarea(id:number){
    return this.http.delete(`http://192.168.1.6:8021/api/v1/clasificacionTarea/eliminarClasificacionTarea/${id}`)
  }


  



}
