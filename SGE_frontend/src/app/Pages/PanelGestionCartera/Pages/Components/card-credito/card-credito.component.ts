import { Component, Input, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-card-credito',
  templateUrl: './card-credito.component.html',
  styleUrls: ['./card-credito.component.css']
})
export class CardCreditoComponent implements OnInit {

  // VARIABLES
  infoPersonal: boolean = false
  saldos: boolean = false

  @Input() btn: any;

  ngOnInit(): void {
  }

  infoPersonalAccordion() {
    if (this.infoPersonal == false) {
      this.infoPersonal = true
    } else {
      this.infoPersonal = false
    }
  }

  saldosAccordion() {
    if (this.saldos == false) {
      this.saldos = true
    } else {
      this.saldos = false
    }
  }

}
