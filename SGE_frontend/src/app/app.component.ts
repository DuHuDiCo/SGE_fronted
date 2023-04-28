import { Component, OnInit } from '@angular/core';
import SuperAdmin from './Models/SuperAdmin';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from './Services/authentication/authentication.service';
import { RolesSystemService } from './Services/rolesPermisosSystem/roles-system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  

  title = 'SGE_frontend';
}
