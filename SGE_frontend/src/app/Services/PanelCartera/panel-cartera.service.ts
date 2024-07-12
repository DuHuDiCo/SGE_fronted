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

  // DATOS PARA CONFIRMAR
  private datoConfirmSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public datoConfirm: Observable<string> = this.datoConfirmSubject.asObservable();

  constructor(private http: HttpClient) { }

  cuentasByCampaña(campania: string) {
    return this.http.get(`${this.url}/cuentas/?campania=${campania}`)
  }

  setBuscarState(newState: boolean) {
    this.buscarStateSubject.next(newState);
  }

  setDatoConfirm(dato: string) {
    this.datoConfirmSubject.next(dato);
  }

}
