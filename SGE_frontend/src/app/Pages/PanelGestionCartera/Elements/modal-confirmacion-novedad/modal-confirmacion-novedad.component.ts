import { Component, Input, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
declare var $: any;

@Component({
  selector: 'app-modal-confirmacion-novedad',
  templateUrl: './modal-confirmacion-novedad.component.html',
  styleUrls: ['./modal-confirmacion-novedad.component.css']
})
export class ModalConfirmacionNovedadComponent implements OnInit {

  datosArray: any[] = []
  @Input() datoConfirmar: any;

  constructor(private panelCarteraService: PanelCarteraService) {

  }

  ngOnInit(): void {
  }

  confirmarDato() {
    this.datosArray.push(this.datoConfirmar)
    this.panelCarteraService.setDatoArray(this.datosArray)
    $('#offcanvasNovedades').offcanvas('show');
  }

}
