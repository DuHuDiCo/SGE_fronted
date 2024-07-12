import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  // ARRAYS
  datosArray: any[] = []

  constructor(private panelCarteraService: PanelCarteraService) {
    this.panelCarteraService.datosArray.subscribe(dato => {
      this.datosArray = dato;
    });
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

}
