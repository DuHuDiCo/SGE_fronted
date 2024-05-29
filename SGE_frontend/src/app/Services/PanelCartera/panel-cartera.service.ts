import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelCarteraService {

  url = 'http://192.168.1.241:8030/api/v1'

  // GESTIONSTATE
  private buttonStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buttonState$: Observable<boolean> = this.buttonStateSubject.asObservable();

  // SIDEBARSTATE
  private sidebarStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarState$: Observable<boolean> = this.sidebarStateSubject.asObservable();

  // VARIABLE TIPO GARANTE
  private tipoGarante = new Subject<any>();
  data$ = this.tipoGarante.asObservable();

  // GESTION MODE
  private gestionMode = new Subject<boolean>();
  gestionMode$ = this.gestionMode.asObservable()

  // ASIGNACION MODE
  private asigMode = new Subject<boolean>();
  asigMode$ = this.asigMode.asObservable()

  // ARRAY DE CUENTAS ABIERTAS PARA EL SIDEBAR
  private cuentasArraySubject: BehaviorSubject<any> = new BehaviorSubject<[]>([])
  public cuentasArray$: Observable<any> = this.cuentasArraySubject.asObservable();

  // ARRAY COLUMNAS PARA ASIGNACION
  private columnasArraySubject: BehaviorSubject<any> = new BehaviorSubject<[]>([])
  public columnasArray$: Observable<any> = this.columnasArraySubject.asObservable();

  constructor(private http: HttpClient) { }

  cuentasByCampaña(campania: string) {
    return this.http.get(`${this.url}/cuentas/?campania=${campania}`)
  }

  setButtonState(newState: boolean) {
    this.buttonStateSubject.next(newState);
  }

  setTipoGarante(data: any) {
    this.tipoGarante.next(data)
  }

  setGestionMode(data: any) {
    this.gestionMode.next(data)
  }

  setAsigMode(data: any) {
    this.asigMode.next(data)
  }

  setSidebarState(newState: boolean) {
    this.sidebarStateSubject.next(newState);
  }

  setCuentasArray(cuentas: any) {
    this.cuentasArraySubject.next(cuentas)
  }

  setColumnasArray(columnas: any) {
    this.columnasArraySubject.next(columnas)
  }

}
