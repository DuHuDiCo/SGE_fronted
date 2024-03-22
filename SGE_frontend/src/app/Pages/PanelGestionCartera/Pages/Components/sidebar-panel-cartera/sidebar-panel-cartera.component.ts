import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-sidebar-panel-cartera',
  templateUrl: './sidebar-panel-cartera.component.html',
  styleUrls: ['./sidebar-panel-cartera.component.css']
})
export class SidebarPanelCarteraComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  buttonState: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  optionSidebar() {
    if (this.buttonState == false) {
      var sidebar = document.getElementById('options');
      this.buttonState = true
      this.messageEvent.emit(this.buttonState)
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
      anime({
        targets: sidebar,
        translateX: ['-5%', '0%'],
        duration: 500,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
      });
    }
  }


}
