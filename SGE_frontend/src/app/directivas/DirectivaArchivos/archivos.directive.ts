import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ROLES } from 'src/app/Types/Roles';

@Directive({
  selector: '[appArchivos]'
})
export class ArchivosDirective implements OnInit {

  permiso:string = ''

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService:AuthenticationService) { }

  ngOnInit(): void {
    var rol = this.authService.getRoles()
    if(rol != null || rol != undefined){

      var roles = rol.find((r:any) => r.rol == ROLES.Administration || r.rol == ROLES.SuperAdministration)
      if(roles != null || roles != undefined){
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        var roles = rol.find((r:any) => r.rol == ROLES.Archivos)

        if(roles != null || roles != undefined){
          roles = rol.permisos.find((p:any) => p.permiso == this.permiso)
          if(roles != null || roles != undefined){
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      }
    }
  }

  @Input()
  set appArchivos(val: string) {
    this.permiso = val;
  }

}
