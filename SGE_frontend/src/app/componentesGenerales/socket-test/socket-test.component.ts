import { Component } from '@angular/core';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';

@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.css']
})
export class SocketTestComponent {

  message: string = '';
  receivedMessage: string = '';

  constructor(private parametrosService: ParametrosService) {
    this.parametrosService.messages.subscribe((msg: string) => {
      this.receivedMessage = msg;
    });
  }

  sendMessage() {
    this.parametrosService.sendMessage(this.message);
    this.message = '';
  }

}
