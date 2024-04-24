import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelCarteraService {

  // BUTTONSTATE
  private buttonStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buttonState$: Observable<boolean> = this.buttonStateSubject.asObservable();

  // VARIABLE TIPO GARANTE
  private tipoGarante = new Subject<any>();
  data$ = this.tipoGarante.asObservable();

  constructor() { }

  setButtonState(newState: boolean) {
    this.buttonStateSubject.next(newState);
  }

  setTipoGarante(data: any) {
    this.tipoGarante.next(data)
  }

}
