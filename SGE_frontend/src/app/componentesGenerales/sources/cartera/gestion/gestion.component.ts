import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'src/app/Pages/Cartera/pages/dashboard/dashboard.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  constructor(private dash:DashboardComponent) { }

  ngOnInit(): void {
    this.dash.cambiar();
    
  }



}
