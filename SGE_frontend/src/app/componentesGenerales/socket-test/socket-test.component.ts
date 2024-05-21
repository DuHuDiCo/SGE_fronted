import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';
import { RxStompService } from 'src/app/Services/AdminCartera/rx-stomp.service';
import { WebSocketService } from 'src/app/Services/Sockets/web-socket.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';


@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.css']
})
export class SocketTestComponent implements OnInit, OnDestroy {

  message: string = ''
  private topicSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService, private auth: AuthenticationService) { }


  ngOnInit(): void {

    const userId = this.auth.getUsername();
    if (userId != null || userId != undefined) {
      this.webSocketService.configure(userId);
      this.topicSubscription = this.webSocketService.getMessages().subscribe(
        (message: any) => {
          console.log(message);

        }
      )

    }




  }


  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
    this.webSocketService.disconnect();
  }
}
