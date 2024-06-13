import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css']
})
export class SidebarRightComponent implements OnInit, AfterViewChecked {

  visibleButton!: boolean;
  private buttonAnimated = false;

  constructor(private carteraService: PanelCarteraService) {
    this.carteraService.buttonState$.subscribe(state => {
      this.visibleButton = state;
      this.buttonAnimated = false;
    });
  }

  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    if (this.visibleButton && !this.buttonAnimated) {
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
