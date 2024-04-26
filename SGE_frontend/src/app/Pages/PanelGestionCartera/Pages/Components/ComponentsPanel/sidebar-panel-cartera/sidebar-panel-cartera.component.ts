import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import anime from 'animejs/lib/anime.es.js';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
import { SideBar } from 'src/app/Types/PanelCartera/sidebar';

@Component({
  selector: 'app-sidebar-panel-cartera',
  templateUrl: './sidebar-panel-cartera.component.html',
  styleUrls: ['./sidebar-panel-cartera.component.css']
})
export class SidebarPanelCarteraComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  // ARRAYS
  arraySidebar: SideBar[] = []
  optionsArray: any[] = [
    false,
    true,
    false,
    false,
    false,
    false
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
  buttonState: boolean = false

  gestionMode: boolean = false
  asigMode: boolean = false

  constructor(private router: Router, private carteraService: PanelCarteraService) {
    carteraService.cuentasArray$.subscribe(cuentas => {
      this.cuentasRecientes = cuentas
    })
  }

  ngOnInit(): void {
    this.fillArray()
    this.carteraService.setColumnasArray(this.columnasArray)
  }

  // VOLVER AL INICIO
  goToHome() {
    this.router.navigate(['/opciones']);
  }

  // METODOS CAMBIO DE OPCION
  sidebarOptions(position: number) {
    this.sidebarAnimation()
    if (this.optionsArray[position] == false) {
      this.optionsArray[position] = true
      for (let i = 0; i < this.optionsArray.length; i++) {
        if (i != position) {
          this.optionsArray[i] = false
        }
      }
    }
  }

  // ANIMACIÓN SIDEBAR
  sidebarAnimation() {
    if (this.buttonState == false) {
      var sidebar = document.getElementById('options');
      this.buttonState = true
      this.messageEvent.emit(this.buttonState)
      this.carteraService.setSidebarState(this.buttonState)
      anime({
        targets: sidebar,
        translateX: ['0%', '-10%'],
        duration: 200,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        complete: () => {
          sidebar!.style.display = 'none'
        }
      });
    } else {
      var sidebar = document.getElementById('options');
      sidebar!.style.display = 'block'
      this.buttonState = false
      this.messageEvent.emit(this.buttonState)
      this.carteraService.setSidebarState(this.buttonState)
      anime({
        targets: sidebar,
        translateX: ['-5%', '0%'],
        duration: 500,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
      });
    }
  }

  // LLENAR ARRAY OPCIONES
  fillArray() {
    const storedState = localStorage.getItem('sidebarState');
    if (storedState !== null) {
      this.arraySidebar = JSON.parse(storedState);
    } else {
      this.arraySidebar = [
        {
          name: 'Gestión De Cobro',
          url: 'gestion',
          var: false
        },
        {
          name: 'Reconocer',
          var: false
        },
        {
          name: 'Consignaciones',
          var: false
        },
        // TODO: SECCIONES PENDIENTES
        // {
        //   name: 'Archivo',
        //   var: false,
        //   disabled: true
        // },
        // {
        //   name: 'Pagos',
        //   var: false,
        //   disabled: true
        // },
        // {
        //   name: 'Servicios',
        //   var: false,
        //   disabled: true
        // },
        // {
        //   name: 'Ventas',
        //   var: false,
        //   disabled: true
        // },
      ]
    }
  }

  // CAMBIO DE OPCION
  changeVar(position: number) {
    for (let i = 0; i < this.arraySidebar.length; i++) {
      if (i == position) {
        this.arraySidebar[position].var = true
      } else {
        this.arraySidebar[i].var = false
      }
      localStorage.setItem('sidebarState', JSON.stringify(this.arraySidebar));
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
  }


}
