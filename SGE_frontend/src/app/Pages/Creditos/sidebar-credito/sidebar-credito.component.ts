import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-credito',
  templateUrl: './sidebar-credito.component.html',
  styleUrls: ['./sidebar-credito.component.css']
})
export class SidebarCreditoComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }
}
