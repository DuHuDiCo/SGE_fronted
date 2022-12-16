import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  

  validDashboar:number = 1;
   
  constructor() { }

  ngOnInit(): void {
    this.validDashboar = 1;
   
  }

  public cambiar(){
    this.validDashboar = 0;
  }

  public cambiarBack(){
    this.validDashboar = 1;
  }

}
