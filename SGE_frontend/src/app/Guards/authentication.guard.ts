import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication/authentication.service';
import { OpcionesService } from '../Services/Opciones/opciones.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authentication: AuthenticationService, private router: Router, private opcionesService:OpcionesService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authentication.isLoggedIn()) {
      var update = this.opcionesService.getUpdate()
      if(update != null && update == true){
        return true;
      }
      
      this.router.navigate(['cambioContrasena'])
      return false;
    }
    this.router.navigate(['login'])
    return false;
  }

}
