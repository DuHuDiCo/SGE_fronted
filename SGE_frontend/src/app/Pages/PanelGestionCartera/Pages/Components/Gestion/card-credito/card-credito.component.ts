import { Component, Input, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
import { Responsables } from 'src/app/Types/PanelCartera/clienteObject';

@Component({
  selector: 'app-card-credito',
  templateUrl: './card-credito.component.html',
  styleUrls: ['./card-credito.component.css']
})
export class CardCreditoComponent implements OnInit {

  // VARIABLES
  infoPersonal: boolean = false
  saldos: boolean = false
  tipoGaranteResponsable: string = ''
  btn!: boolean

  // ARRAYS
  responsablesArray: Responsables[] = []


  constructor(private panelService: PanelCarteraService) {
    this.panelService.sidebarState$.subscribe(state => {
      this.btn = state
      console.log(this.btn);
    })
  }

  ngOnInit(): void {
    this.responsablesArray = [
      {
        tipoGarante: 'TITULAR',
        nombre: 'Yeimar Fernando Sánchez'
      },
      {
        tipoGarante: 'CODEUDOR',
        nombre: 'Duván Diaz'
      }
    ]

    this.tipoGaranteResponsable = this.responsablesArray[0].tipoGarante
    this.panelService.setTipoGarante(this.responsablesArray[0].tipoGarante)
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

  findTipoGarante(event: any) {
    var type = this.responsablesArray.find((t: any) => t.nombre == event.target.value)
    if (type != null && type != undefined) {
      this.tipoGaranteResponsable = type.tipoGarante
      this.panelService.setTipoGarante(this.tipoGaranteResponsable)
    }
  }

}
