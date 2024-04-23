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

  // ARRAYS
  responsablesArray: Responsables[] = []

  @Input() btn: any;

  ngOnInit(): void {
    this.responsablesArray = [
      {
        tipoGarante: 'Titular',
        nombre: 'Yeimar Fernando Sánchez'
      },
      {
        tipoGarante: 'Codeudor',
        nombre: 'Duván Diaz'
      }
    ]

    this.tipoGaranteResponsable = this.responsablesArray[0].tipoGarante
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

  findTipoGarante(event: any){
    var type = this.responsablesArray.find((t:any) => t.nombre == event.target.value)
    if(type != null && type != undefined){
      this.tipoGaranteResponsable = type.tipoGarante
    }
  }

}
