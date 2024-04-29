import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-options-asignacion',
  templateUrl: './options-asignacion.component.html',
  styleUrls: ['./options-asignacion.component.css']
})
export class OptionsAsignacionComponent implements OnInit {

  // ARRAYS
  optionsAsignacion: any[] = [
    {
      name: 'Gestión De Cobro',
      url: 'gestionAsignacion',
      var: false
    },
    {
      name: 'Reconocer',
      var: false
    },
    {
      name: 'Consignaciones',
      var: false
    }
  ]
  cuentasRecientes: any[] = []
  columnasArray: string[] = [
    'Banco',
    'Dias Vencidos',
    'Edad De Vencimiento',
    'Sucursal',
    'Asesor',
    'Clasificacion Jurídica',
    'Saldo Capital',
    'Año',
    'Fecha Gestión',
    'Fecha Compromiso',
    'Ultima Clasificacion'
  ]
  columnsStatic: string[] = [
    'Banco',
    'Dias Vencidos',
    'Edad De Vencimiento',
    'Sucursal',
    'Asesor',
    'Clasificacion Jurídica',
    'Saldo Capital',
    'Año',
    'Fecha Gestión',
    'Fecha Compromiso',
    'Ultima Clasificacion'
  ]

  // VARIABLES
  asigMode: boolean = false
  btn!: boolean

  constructor(private router: Router, private carteraService: PanelCarteraService) {
    carteraService.cuentasArray$.subscribe(cuentas => {
      this.cuentasRecientes = cuentas
    })

    carteraService.buttonState$.subscribe(data => {
      this.btn = data
    })

    carteraService.asigMode$.subscribe(data => {
      this.asigMode = data
    })
  }

  ngOnInit(): void {
    this.carteraService.setColumnasArray(this.columnasArray)
  }

  // CAMBIO DE OPCION
  changeVar(position: number) {
    for (let i = 0; i < this.optionsAsignacion.length; i++) {
      if (i == position) {
        this.optionsAsignacion[position].var = true
      } else {
        this.optionsAsignacion[i].var = false
      }
      localStorage.setItem('sidebarState', JSON.stringify(this.optionsAsignacion));
    }
  }

  // OCULTAR COLUMNAS
  hideColumna(columna: string) {
    if (this.columnasArray.includes(columna)) {
      var position = this.columnasArray.indexOf(columna)
      this.columnasArray.splice(position, 1)
    } else {
      this.columnasArray.push(columna)
    }
    this.carteraService.setColumnasArray(this.columnasArray)
  }

  deleteCuenta(cuenta: string) {
    var current = this.cuentasRecientes.find((c: any) => c == cuenta)
    var position = this.cuentasRecientes.indexOf(current)
    this.cuentasRecientes.splice(position, 1)
    this.carteraService.setCuentasArray(this.cuentasRecientes)

    if (this.cuentasRecientes.length == 0) {
      this.router.navigate(['/dashboard-cartera/inicio/asignacion'])
    }
  }

  changeAsigMode() {
    this.carteraService.setAsigMode(this.asigMode)
  }

}
