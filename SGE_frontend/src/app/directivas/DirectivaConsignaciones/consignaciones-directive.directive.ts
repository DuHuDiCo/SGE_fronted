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
      
      var permisoObtenido = rol.permisos.find((p:any) => p.permiso == this.permiso)
      if(permisoObtenido != null || permisoObtenido != undefined){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }

  }

  @Input()
  set appConsignacionesDirective(val: string) {
    this.permiso = val;
  }

}
