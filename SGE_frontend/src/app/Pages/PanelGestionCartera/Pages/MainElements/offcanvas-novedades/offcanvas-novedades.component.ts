import { Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-offcanvas-novedades',
  templateUrl: './offcanvas-novedades.component.html',
  styleUrls: ['./offcanvas-novedades.component.css']
})
export class OffcanvasNovedadesComponent implements OnInit {

  // VARIABLES
  btn!: boolean

  // ARRAYS
  datosPorConfirmar: string[] = []
  datosConfirmados: any[] = []
  celArray: string[] = []
  direccionArray: string[] = []
  correoArray: string[] = []
  refArray: string[] = []
  infolArray: string[] = []

  constructor(private panelService: PanelCarteraService) {
    this.panelService.sidebarState$.subscribe(state => {
      this.btn = state
    })
  }

  ngOnInit(): void {
  }

  cancelDato(dato: any) {
    var array: string[] = []

    if (this.datosConfirmados.includes(dato)) {
      var pos = this.datosConfirmados.indexOf(dato)
      this.datosConfirmados.splice(pos, 1)
      this.datosPorConfirmar.push(dato.dato)
      if (!this.datosPorConfirmar.includes(dato.type)) {
        this.datosPorConfirmar.push(dato.type)
      }

      switch (dato.type) {
        case 'CEL':
          array = this.celArray
          break;
        case 'DIRECCION':
          array = this.direccionArray
          break;
        case 'CORREO':
          array = this.correoArray
          break;
        case 'REF':
          array = this.refArray
          break;
        case 'INFOL':
          array = this.infolArray
          break;
      }

      if (dato.type == dato.type) {
        var position = array.indexOf(dato.dato)
        array.splice(position, 1)
      }

      if (this.datosConfirmados.length == 0) {
        this.panelService.setButtonState(false)
      } else {
        this.panelService.setButtonState(true)
      }
    }
    console.log(this.datosPorConfirmar);
  }

}
