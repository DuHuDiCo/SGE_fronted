import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ROLES, Roles } from 'src/app/Types/Roles';

@Directive({
  selector: '[appConsignacionesDirective]'
})
export class ConsignacionesDirectiveDirective implements OnInit {

  permiso:string = ''

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService:AuthenticationService) { }

  ngOnInit(): void {
    var rol = this.authService.getRolesP()

    var rolConvert = this.convertirString(rol)
    console.log(rolConvert);
    
    if(rolConvert.includes(ROLES.Administration) || rolConvert.includes(ROLES.SuperAdministration.toUpperCase())){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    
    if(rol != null || rol != undefined){
      
      var permisoObtenido = rol.permisos.find((p:any) => p.permiso == this.permiso)
      if(permisoObtenido != null || permisoObtenido != undefined){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }

  }

  private convertirString(rolesUser:any[]):string[] {
    var rol:string[] = []
    rolesUser.forEach((x: Roles) => {
      rol.push(x.rol)
    });
    return rol
  }

  @Input()
  set appConsignacionesDirective(val: string) {
    this.permiso = val;
  }

}
