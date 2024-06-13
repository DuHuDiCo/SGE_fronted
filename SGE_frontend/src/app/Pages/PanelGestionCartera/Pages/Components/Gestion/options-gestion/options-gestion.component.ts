import { Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
import { SideBar } from 'src/app/Types/PanelCartera/sidebar';

@Component({
  selector: 'app-options-gestion',
  templateUrl: './options-gestion.component.html',
  styleUrls: ['./options-gestion.component.css']
})
export class OptionsGestionComponent implements OnInit {

  optionsArray: SideBar[] = [
    {
      name: 'Gestión De Cobro',
      url: 'gestion',
      var: false
    },
    {
      name: 'Localización',
      var: false
    },
    {
      name: 'Consignaciones',
      var: false
    }
  ]

  // VARIABLES
  buttonState: boolean = false
  gestionMode: boolean = false

  constructor(private panelService: PanelCarteraService) { }

  ngOnInit(): void {
  }

  // CAMBIO DE OPCION
  changeVar(position: number) {
    for (let i = 0; i < this.optionsArray.length; i++) {
      if (i == position) {
        this.optionsArray[position].var = true
      } else {
        this.optionsArray[i].var = false
      }
      localStorage.setItem('sidebarState', JSON.stringify(this.optionsArray));
    }
  }

}
