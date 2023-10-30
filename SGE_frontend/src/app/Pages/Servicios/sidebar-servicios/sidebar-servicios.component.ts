import { Component, OnInit } from '@angular/core';
import { windowTime } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-servicios',
  templateUrl: './sidebar-servicios.component.html',
  styleUrls: ['./sidebar-servicios.component.css']
})
export class SidebarServiciosComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
