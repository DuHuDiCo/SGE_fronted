import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-panel-cartera',
  templateUrl: './dashboard-panel-cartera.component.html',
  styleUrls: ['./dashboard-panel-cartera.component.css']
})
export class DashboardPanelCarteraComponent implements OnInit {

  buttonState: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  changeBtn($data: any) {
    this.buttonState = $data
  }

}
