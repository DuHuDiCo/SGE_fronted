import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelCarteraService {

  private buttonStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buttonState$: Observable<boolean> = this.buttonStateSubject.asObservable();

  constructor() { }

  setButtonState(newState: boolean) {
    this.buttonStateSubject.next(newState);
  }

}
