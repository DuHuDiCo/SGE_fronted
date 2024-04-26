import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelCarteraService {

  // GESTIONSTATE
  private buttonStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buttonState$: Observable<boolean> = this.buttonStateSubject.asObservable();

  // SIDEBARSTATE
  private sidebarStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarState$: Observable<boolean> = this.sidebarStateSubject.asObservable();

  // VARIABLE TIPO GARANTE
  private tipoGarante = new Subject<any>();
  data$ = this.tipoGarante.asObservable();

  // ARRAY DE CUENTAS ABIERTAS PARA EL SIDEBAR
  private cuentasArraySubject: BehaviorSubject<any> = new BehaviorSubject<[]>([])
  public cuentasArray$: Observable<any> = this.cuentasArraySubject.asObservable();

  // ARRAY COLUMNAS PARA ASIGNACION
  private columnasArraySubject: BehaviorSubject<any> = new BehaviorSubject<[]>([])
  public columnasArray$: Observable<any> = this.columnasArraySubject.asObservable();

  constructor() { }

  setButtonState(newState: boolean) {
    this.buttonStateSubject.next(newState);
  }

  setTipoGarante(data: any) {
    this.tipoGarante.next(data)
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
