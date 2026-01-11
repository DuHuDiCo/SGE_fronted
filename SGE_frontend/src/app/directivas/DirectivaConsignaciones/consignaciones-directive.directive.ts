import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ROLES, Roles } from 'src/app/Types/Roles';

@Directive({
  selector: '[appConsignacionesDirective]'
})
export class ConsignacionesDirectiveDirective implements OnInit {

  permiso: string = ''

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthenticationService) { }

  ngOnInit(): void {
    var roles = this.authService.getRoles()
    
    if (roles != null || roles != undefined) {
      var rol = roles.find((r: any) => r.rol == ROLES.Administration)
      
      if (rol) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        return;
      }


      var rolCosig = roles.find((r: any) => r.rol == ROLES.Consignaciones)
      var permisoObtenido = rolCosig.permisos.find((p: any) => p.permiso == this.permiso)
      if (permisoObtenido != null || permisoObtenido != undefined) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }

  }

  @Input()
  set appConsignacionesDirective(val: string) {
    this.permiso = val;
  }

}
