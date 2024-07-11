import { Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-sidebar-panel-cartera',
  templateUrl: './sidebar-panel-cartera.component.html',
  styleUrls: ['./sidebar-panel-cartera.component.css']
})
export class SidebarPanelCarteraComponent implements OnInit {

  buscarState!: boolean

  constructor(private panelService: PanelCarteraService) {
    this.panelService.buscarState.subscribe(state => {
      this.buscarState = state
    })
  }

  ngOnInit(): void {
  }

}
