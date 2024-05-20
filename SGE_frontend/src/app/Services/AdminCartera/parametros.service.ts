import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, IStompSocket, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { Campaign } from 'src/app/Types/PanelCartera/campaign';

import * as SockJS from 'sockjs-client';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  url = 'http://192.168.1.241:8030/api/v1'

  private client!: Client;
  private messageSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://192.168.1.241:8030/ws') as IStompSocket;
    };

    var token = authService.getToken()

    this.client.connectHeaders = {
      Authorization: 'Bearer ' + token
    };

    this.client.onConnect = (frame) => {
      console.log('Connected to WebSocket');
      this.client.subscribe('/topic/messages', (message: Message) => {
        this.messageSubject.next(message.body);
      });

      this.client.subscribe('/topic/notifications', (message: Message) => {
        alert('Notificación: ' + message.body);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

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

  // ASESORES
  getAsesores() {
    return this.http.get(`${this.url}/asesores/`)
  }

  sendMessage(message: string) {
    this.client.publish({ destination: '/app/message', body: `1:${message}` });
  }

  get messages() {
    return this.messageSubject.asObservable();
  }



}
