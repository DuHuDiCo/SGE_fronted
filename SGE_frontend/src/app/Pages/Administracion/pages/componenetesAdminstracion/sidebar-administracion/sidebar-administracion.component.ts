import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-administracion',
  templateUrl: './sidebar-administracion.component.html',
  styleUrls: ['./sidebar-administracion.component.css']
})
export class SidebarAdministracionComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
