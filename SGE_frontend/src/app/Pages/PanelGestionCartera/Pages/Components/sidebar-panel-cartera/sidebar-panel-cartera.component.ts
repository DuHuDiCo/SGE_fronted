import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import anime from 'animejs/lib/anime.es.js';
import { SideBar } from 'src/app/Types/PanelCartera/sidebar';

@Component({
  selector: 'app-sidebar-panel-cartera',
  templateUrl: './sidebar-panel-cartera.component.html',
  styleUrls: ['./sidebar-panel-cartera.component.css']
})
export class SidebarPanelCarteraComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  arraySidebar: SideBar[] = []
  buttonState: boolean = false
  gestionMode: boolean = false

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.fillArray()
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
        {
          name: 'Archivo',
          var: false,
          disabled: true
        },
        {
          name: 'Pagos',
          var: false,
          disabled: true
        },
        {
          name: 'Servicios',
          var: false,
          disabled: true
        },
        {
          name: 'Ventas',
          var: false,
          disabled: true
        },
      ]
    }
  }

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

  goToHome(){
    this.router.navigate(['/opciones']);
  }


}
