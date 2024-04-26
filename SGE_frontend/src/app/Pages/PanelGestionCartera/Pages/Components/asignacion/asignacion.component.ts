import { Component, Input, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  // ARRAYS
  cuentasArray: any[] = []
  columnasArray: string[] = [
  ]

  // VARIABLES
  btn!: boolean

  constructor(private carteraService: PanelCarteraService) {
    this.carteraService.sidebarState$.subscribe(state => {
      this.btn = state
    })

    this.carteraService.columnasArray$.subscribe(colums => {
      this.columnasArray = colums
    })
  }

  ngOnInit(): void {
  }

  // ENVIAR CUENTA AL SIDEBAR
  setCuenta(cliente: string) {
    var cuenta = this.cuentasArray.find((c: any) => c == cliente)
    if (cuenta == undefined || cuenta == '' || cuenta == null) {
      this.cuentasArray.unshift(cliente)
      this.carteraService.setCuentasArray(this.cuentasArray)
    }
    console.log(this.cuentasArray);
  }



}
