import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxStompService } from '../AdminCartera/rx-stomp.service';
import { RxStompConfig } from '@stomp/rx-stomp';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private messagesSubject!: Subject<string>;

  constructor(private rxStompService: RxStompService) {
    this.messagesSubject = new Subject<string>();
  }

  configure(userId: string) {
    const config: RxStompConfig = {
      webSocketFactory: () => new SockJS('http://192.168.1.241:8030/our-websocket'),
      connectHeaders: {
        'user_id': userId
      },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 5000,
      debug: (msg: string): void => {
        console.log(msg);
      }
    };

    this.rxStompService.configure(config);
    this.rxStompService.activate();
    this.rxStompService.connected$.subscribe(
      () => {
        this.rxStompService.watch("/user/queue/reply").subscribe(
          (message: any) => {
            this.messagesSubject.next(message.body)
          }
        )
      }
    )
  }

  getMessages():Observable<string>{
    return this.messagesSubject.asObservable();
  }

  disconnect() {
    this.rxStompService.deactivate();
  }
}
