import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-admin-general',
  templateUrl: './sidebar-admin-general.component.html',
  styleUrls: ['./sidebar-admin-general.component.css']
})
export class SidebarAdminGeneralComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }
}
