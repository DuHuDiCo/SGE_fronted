import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-cartera',
  templateUrl: './sidebar-cartera.component.html',
  styleUrls: ['./sidebar-cartera.component.css']
})
export class SidebarCarteraComponent implements OnInit {

 

  constructor(private dash:DashboardComponent, private router:Router, private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  public redireccionar(ruta:string){
    this.dash.cambiar()
    this.router.navigate([ruta])
  }

  public redireccionarBack(ruta:string){
    this.dash.cambiarBack()
    this.router.navigate([ruta])

  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
