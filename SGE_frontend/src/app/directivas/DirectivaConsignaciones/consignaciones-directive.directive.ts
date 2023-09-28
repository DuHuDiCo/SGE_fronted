import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Directive({
  selector: '[appConsignacionesDirective]'
})
export class ConsignacionesDirectiveDirective implements OnInit {

  permiso:string = ''

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService:AuthenticationService) { }

  ngOnInit(): void {
    var rol = this.authService.getRolesP()

    if(rol != null || rol != undefined){
      if(rol.permisos.includes(this.permiso)){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

  @Input()
  set appRolesPerfiles(val: string) {
    this.permiso = val;
  }

}
