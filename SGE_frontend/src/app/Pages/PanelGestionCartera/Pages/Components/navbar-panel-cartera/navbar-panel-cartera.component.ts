import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-navbar-panel-cartera',
  templateUrl: './navbar-panel-cartera.component.html',
  styleUrls: ['./navbar-panel-cartera.component.css']
})
export class NavbarPanelCarteraComponent implements OnInit {

  modoGestion: boolean = false
  cuentaSelect: string = '1002143638'

  cuentasArray: string[] = [
    '1002143638',
    '1002143637',
    '1002143636'
  ]

  constructor() { }

  ngOnInit(): void {
  }

  cambiarCuenta(obligacion: string) {
    this.cuentaSelect = obligacion
  }

  cerrarCuenta(obligacion: string, element: number) {
    console.log(element);

    anime({
      targets: `#card_${element}`,
      translateY: -250,
      duration: 500,
      easing: 'easeInOutQuad',
      complete: () => {
        var position = this.cuentasArray.findIndex((o: any) => o == obligacion)
        this.cuentasArray.splice(position, 1)
      }
    });
  }

}
