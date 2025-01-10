import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-a2configuraciones',
  templateUrl: './sidebar-a2configuraciones.component.html',
  styleUrls: ['./sidebar-a2configuraciones.component.css']
})
export class SidebarA2configuracionesComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authenticationService.logout()
    window.location.reload()
  }


}
