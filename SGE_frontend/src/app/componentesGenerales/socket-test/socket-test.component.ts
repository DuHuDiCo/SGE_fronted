import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';
import { RxStompService } from 'src/app/Services/AdminCartera/rx-stomp.service';


@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.css']
})
export class SocketTestComponent implements OnInit {

  message: string = ''
  private topicSubscription!: Subscription;

  constructor(private webSocketService: RxStompService) { }

  ngOnInit(): void {

    this.topicSubscription = this.webSocketService.watch('/topic/message').subscribe(
      (message: any) => {
        console.log(message.body);

      });

  }

}
