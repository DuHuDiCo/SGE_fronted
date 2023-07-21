import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-archivos',
  templateUrl: './sidebar-archivos.component.html',
  styleUrls: ['./sidebar-archivos.component.css']
})
export class SidebarArchivosComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }
}
