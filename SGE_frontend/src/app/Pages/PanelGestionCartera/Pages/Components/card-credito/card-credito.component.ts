import { Component, Input, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-card-credito',
  templateUrl: './card-credito.component.html',
  styleUrls: ['./card-credito.component.css']
})
export class CardCreditoComponent implements OnInit {

  visibleButton!: boolean

  @Input() btn: any;

  constructor(private carteraService: PanelCarteraService) {
    this.carteraService.buttonState$.subscribe(state => {
      this.visibleButton = state
    })
  }

  ngOnInit(): void {
  }

}
