import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelCarteraService {

  url = 'http://192.168.1.241:8030/api/v1'

  // BUSCAR BOOLEAN
  private buscarStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buscarState: Observable<boolean> = this.buscarStateSubject.asObservable();

  // DATOS PARA CONFIRMAR ARRAY
  private datosArraySubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public datosArray: Observable<any> = this.datosArraySubject.asObservable();

  // DATOS CONFIRMADOS ARRAY
  private datosConfirmArraySubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public datosConfirmArray: Observable<any> = this.datosConfirmArraySubject.asObservable();

  constructor(private http: HttpClient) { }

  cuentasByCampaña(campania: string) {
    return this.http.get(`${this.url}/cuentas/?campania=${campania}`)
  }

  setBuscarState(newState: boolean) {
    this.buscarStateSubject.next(newState);
  }

  setDatoArray(array: any) {
    this.datosArraySubject.next(array);
  }

  setDatoConfirmArray(array: any) {
    this.datosConfirmArraySubject.next(array);
  }

}
