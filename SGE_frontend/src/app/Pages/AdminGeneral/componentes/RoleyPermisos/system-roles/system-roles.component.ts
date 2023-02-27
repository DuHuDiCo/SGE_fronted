import { Component, OnInit } from '@angular/core';
import { RolesSystemService } from 'src/app/Services/rolesPermisosSystem/roles-system.service';
import { RolSystem } from 'src/app/Types/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-roles',
  templateUrl: './system-roles.component.html',
  styleUrls: ['./system-roles.component.css']
})
export class SystemRolesComponent implements OnInit {


  roles:string[]= [];
  
  rolesSaved:string[]= [];

  valid:boolean = false
  constructor(private systemRoles:RolesSystemService) {
    
   }

  ngOnInit(): void {
  }

  enviar(event:any):void{
    var rol = event.srcElement.value.toUpperCase()
    if(event.keyCode == 13){

      if(rol != ''){
        if(!this.roles.includes(rol)){
        
          this.roles.push(rol)
          
          event.srcElement.value = ''
          this.valid = false
          
        }else{
          this.valid = true
        }
      }
     
      
      
    }
  }

  quitarRol(rol:string){
    this.roles = this.roles.filter(r=> r != rol);
  }

  guardarRoles(){
    this.systemRoles.saveRoles(this.roles).subscribe(
      (data:any)=>{

        console.log(data);
        Swal.fire({
          position:'top-end',
          icon:'success',
          title:'Inicio Sesion Exitoso',
          showConfirmButton: false,
          timer:2000
        })
      },(error:any)=>{
        console.log(error);
        
      }
    );
  }
}
