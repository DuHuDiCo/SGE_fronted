import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolUsuario } from '../models/rol-usuario';
import { AuthenticationService } from '../Services/authentication/authentication.service';

@Directive({
  selector: '[appRolesPerfiles]'
})
export class RolesPerfilesDirective implements OnInit {

  rolesUser: any = [];
  rol = "";

  rolesString: any = []


  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthenticationService) { }




  ngOnInit(): void {
    this.rolesUser = this.authService.getRoles();
    this.convertirString();
    console.log(this.rol);

    if (this.rolesString[0] == "Administrador") {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.verificarRol(this.rol)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      
    }


  }

  @Input()
  set appRolesPerfiles(val: string) {
    this.rol = val;


  }

  private convertirString() {
    this.rolesUser.forEach((x: any) => {
      this.rolesString.push(x.rol)
    });



  }


  private verificarRol(dato:any): boolean {
    return this.rolesString.includes(dato)
  }
}