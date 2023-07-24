import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-caja',
  templateUrl: './sidebar-caja.component.html',
  styleUrls: ['./sidebar-caja.component.css']
})
export class SidebarCajaComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
