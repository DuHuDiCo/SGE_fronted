import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tarea, TareaUpdate } from 'src/app/Types/Cartera/Clasificacion-Tarea/Tarea';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentaCobrarCalculate } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { Filtros, Gestion, TipoVencimiento } from 'src/app/Types/Cartera/Gestion/Gestion';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CuentasCobrarService {

  // CUENTASPORCOBRAR

  constructor(private http:HttpClient) { }

  public proSubject = new Subject<boolean>();

  getCuentasCobrar(username:string, page:number, size:number, fechaCreacion:string){
    return this.http.get(`http://192.168.1.52:8021/api/v1/cuentas/cuentasCobrar?username=${username}&page=${page}&size=${size}&fechaCreacion=${fechaCreacion}`)
  }

  getCuentaByObligacion(numeroObligacion:string){
    return this.http.get(`http://192.168.1.52:8021/api/v1/cuentas/getCuentaCobrarByNumeroObligacion?numeroObligacion=${numeroObligacion}`)
  }

  getCuentaByCedula(cedula:string){
    return this.http.get(`http://192.168.1.52:8021/api/v1/cuentas/getCuentaCobrarByCedula?cedula=${cedula}`)
  }

  getCuentaByDato(dato:string){
    return this.http.get(`http://192.168.1.52:8021/api/v1/cuentas/cuentasByDato?dato=${dato}`)
  }

  
  updateCuentaCobrar(cuentaCobrar:CuentaCobrarCalculate){
    return this.http.put(`http://192.168.1.52:8021/api/v1/cuentas/updateCuentaCobrarToCalculate`, cuentaCobrar)

  }

  //FILTRO
  filtro(page:number, size:number, fechaCreacion:string, dto:Filtros, ){
    return this.http.post(`http://192.168.1.52:8021/api/v1/cuentas/filtrosCuentas?page=${page}&size=${size}&fechaCreacion=${fechaCreacion}`, dto)

  }

  // CLASIFICACIONES

  getClasificacion(){
    return this.http.get(`http://192.168.1.52:8021/api/v1/nombreClasificacion/clasificaciones`)
  }

  getClasificacionById(id:number){
    return this.http.get(`http://192.168.1.52:8021/api/v1/nombreClasificacion/clasificacionById?id=${id}`)
  }

  saveClasificacion(clasificacion:any){
    return this.http.post(`http://192.168.1.52:8021/api/v1/nombreClasificacion/guardarClasificacion`, clasificacion)
  }

  updateClasificacion(clasificacion:clasificacion){
    return this.http.put(`http://192.168.1.52:8021/api/v1/clasificacion/updateClasificacion`, clasificacion)
  }

  // GESTIONES

  getGestiones(numeroObligacion:string){
    return this.http.get(`http://192.168.1.52:8021/api/v1/gestiones/getGestionByNumObligacion/${numeroObligacion}`)
  }

  saveGestion(gestion:Gestion){
    return this.http.post(`http://192.168.1.52:8021/api/v1/gestiones/saveOneGestion`, gestion)
  }

  getLastDatoAdicional(numeroObligacion:string){
    return this.http.get(`http://192.168.1.52:8021/api/v1/gestiones/getLastDatoAdicionalGestion/${numeroObligacion}`)
  }

  desactivateAcuerdoPago(id:number){
    return this.http.put(`http://192.168.1.52:8021/api/v1/gestiones/desactivateAcuerdoPago/${id}`, null)
  }

  reporte(data:any){
    return this.http.put(`http://192.168.1.52:8021/api/v1/gestiones/linkAndReporteAcuerdoToClient`, data)
  }

  // TIPO VENCIMIENTO
  saveTipoVencimiento(tipoVencimiento:TipoVencimiento){
    return this.http.post(`http://192.168.1.52:8021/api/v1/tiposVencimiento/guardarTipoVencimiento`, tipoVencimiento)
  }

  getTipoVencimiento(){
    return this.http.get(`http://192.168.1.52:8021/api/v1/tiposVencimiento/obtenerTodosTiposVencimientos`)
  }

  getTipoVencimientoById(id:number){
    return this.http.get(`http://192.168.1.52:8021/api/v1/tiposVencimiento/obtenerTiposVencimientoPorId/${id}`)
  }

  updateTipoVencimiento(tipoVencimiento:TipoVencimiento){
    return this.http.put(`http://192.168.1.52:8021/api/v1/tiposVencimiento/updateTipoVencimiento`, tipoVencimiento)

  }

  //SEDES
  getSedes(){
    return this.http.get(`http://192.168.1.52:8021/api/v1/sedesController/obtenerTodasSedes`)

  }


  //PAGOS
  crearRecibo(pagoCuota:any){
    return this.http.post(`http://192.168.1.31:8021/api/v1/pagos/guardarPago`, pagoCuota)
  }

  enviarCuotaPagada(id:number[]){
    return this.http.put(`http://192.168.1.31:8021/api/v1/gestiones/cuotaPago`, id)
  }

}
