import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ROLES } from 'src/app/Types/Roles';

@Injectable({
  providedIn: 'root'
})
export class GuardCajaGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  validarPermisoEnRolCartera(permiso: string, rolesCartera: any): any[] {
    var permisos = rolesCartera[0].permisos.filter((p: any) => p.permiso == permiso);
    return permisos;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var admin = this.authService.getRolesByName(ROLES.Administration);

    if(admin.length > 0){
      return true
    }

    var cartera = this.authService.getRolesByName(ROLES.Cartera);

    console.log(cartera);
    

    if (cartera.length == 0) {
      // No tiene el rol, redirige
      this.router.navigate(['/opciones']);
      return false; // Evita que continúe la navegación
    }

    var permiso = this.validarPermisoEnRolCartera("CREAR ASESORES", cartera);

    if (permiso && permiso.length > 0 && permiso[0].permiso == "CREAR ASESORES") {
      // No tiene el permiso, redirige
      this.router.navigate(['/dashboard-cartera/inicio']);
      return false; // Evita que continúe la navegación
    }

    return true; // Permite la navegación si tiene el rol y el permiso
  }
}
