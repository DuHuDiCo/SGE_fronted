import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
declare var $: any;

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  // ARRAYS
  datosArray: any[] = []
  datosConfirmArray: any[] = []

  constructor(private panelCarteraService: PanelCarteraService) {
    this.panelCarteraService.datosArray.subscribe(dato => {
      this.datosArray = dato;
    });

    this.panelCarteraService.datosConfirmArray.subscribe(array => {
      this.datosConfirmArray = array
    })
  }

  private buttonAnimated = false;

  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    if (this.datosArray.length > 0 && !this.buttonAnimated) {
      this.buttonAnimation();
      this.buttonAnimated = true;
    }
  }

  buttonAnimation() {
    anime({
      targets: '.highlight-button',
      scale: [1, 1.5],
      duration: 1000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true,
    });
  }

  cancelarAccion(tipo: string, boton: string) {
    var pos = this.datosArray.findIndex((d: any) => d.tipo == tipo && d.boton == boton)
    this.datosArray.splice(pos, 1)
    this.panelCarteraService.setDatoArray(this.datosArray)

    var pos = this.datosConfirmArray.findIndex((d: any) => d.tipo == tipo && d.boton == boton)
    this.datosConfirmArray.splice(pos, 1)
    this.panelCarteraService.setDatoConfirmArray(this.datosConfirmArray)

    if (this.datosArray.length == 0) {
      this.buttonAnimated = false
      $('#offcanvasNovedades').offcanvas('hide');
    }
  }

}
