import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-perfil',
  templateUrl: './sidebar-perfil.component.html',
  styleUrls: ['./sidebar-perfil.component.css']
})
export class SidebarPerfilComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  // Función para cerrar sesion del usuario
  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
