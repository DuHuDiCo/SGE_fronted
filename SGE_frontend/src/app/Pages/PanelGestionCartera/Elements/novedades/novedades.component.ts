import { Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  // ARRAYS
  datosArray: any[] = []

  constructor(private panelCarteraService: PanelCarteraService) {
    this.panelCarteraService.datosArray.subscribe(dato => {
      this.datosArray = dato;
    });
  }

  ngOnInit(): void {
  }

}
