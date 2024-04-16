import { Component, OnInit } from '@angular/core';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css']
})
export class SidebarRightComponent implements OnInit {

  visibleButton!: boolean

  constructor(private carteraService: PanelCarteraService) {
    this.carteraService.buttonState$.subscribe(state => {
      this.visibleButton = state
    })
  }

  ngOnInit(): void {
  }

}
