import { Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
declare var $: any;

@Component({
  selector: 'app-modo-gestion',
  templateUrl: './modo-gestion.component.html',
  styleUrls: ['./modo-gestion.component.css']
})
export class ModoGestionComponent implements OnInit {

  responsableSelect: string = 'Yeimar Fernando Sánchez'
  datoConfirmObj: any = {}

  // ARRAYS
  responsables: any[] = [
    {
      tipoGarante: 'Titular',
      nombre: 'Yeimar Fernando Sánchez'
    },
    {
      tipoGarante: 'Codeudor',
      nombre: 'Duvan Huberto Diaz'
    },
    {
      tipoGarante: 'Codeudor',
      nombre: 'Johan Andres Hernandez'
    }
  ]
  datosConfirmArray: any[] = []
  arrayCard: string[] = []

  constructor(private panelCarteraService: PanelCarteraService) {
    this.panelCarteraService.datosConfirmArray.subscribe(array => {
      this.datosConfirmArray = array
    })
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  openCards(name: string) {
    if (!this.arrayCard.includes(name)) {
      this.arrayCard.push(name)
    } else {
      var posCard = this.arrayCard.findIndex((ar: string) => ar == name)
      this.arrayCard.splice(posCard, 1)
    }
  }

  cambiarResponsable(nombre: string) {
    this.responsableSelect = nombre
  }

  enviarDatoToConfirm(dato: string, icon: string, tipo: string, boton: string) {
    this.datoConfirmObj = {
      dato: dato,
      icon: icon,
      tipo: tipo,
      boton: boton
    }
  }

}
