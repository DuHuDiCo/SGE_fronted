import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-consignaciones',
  templateUrl: './sidebar-consignaciones.component.html',
  styleUrls: ['./sidebar-consignaciones.component.css']
})
export class SidebarConsignacionesComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
