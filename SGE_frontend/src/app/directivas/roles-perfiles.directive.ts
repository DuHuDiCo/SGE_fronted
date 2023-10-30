import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import Roles from '../Models/Roles';
import { AuthenticationService } from '../Services/authentication/authentication.service';
import { ROLES } from '../Types/Roles';

@Directive({
  selector: '[appRolesPerfiles]'
})
export class RolesPerfilesDirective implements OnInit {

  rolesUser: Roles[] = [];
  rol:string = "";

  rolesString: string[] = []


  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.rolesUser = this.authService.getRoles();
    this.convertirString();
    console.log(this.rolesString);
    
    if (this.rolesString.includes(ROLES.SuperAdministration.toUpperCase()) || this.rolesString.includes(ROLES.Administration)) {

      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.verificarRol(this.rol.toUpperCase())) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

  @Input()
  set appRolesPerfiles(val: string) {
    this.rol = val;
  }

  private convertirString():void {
    this.rolesUser.forEach((x: Roles) => {
      
      this.rolesString.push(x.rol)

    });



  }


  private verificarRol(dato:any): boolean {
    return this.rolesString.includes(dato)
  }
}