import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-archivos',
  templateUrl: './sidebar-archivos.component.html',
  styleUrls: ['./sidebar-archivos.component.css']
})
export class SidebarArchivosComponent implements OnInit {

  permisos: string[] = ['ELIMINAR ARCHIVOS', 'EDITAR ARCHIVOS', 'SUBIR UN ARCHIVO', 'SUBIR ARCHIVOS', 'CREAR TIPOS ARCHIVO', 'EDITAR TIPOS ARCHIVO', 'BUSCAR ARCHIVOS']

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }
}
