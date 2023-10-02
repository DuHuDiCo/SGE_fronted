import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { GuardarUsuariosAdminService } from 'src/app/Services/guardarUsuariosAdmin/guardar-usuarios-admin.service';
import { Roles, RolesUser } from 'src/app/Types/Roles';
import { Sede } from 'src/app/Types/Sede';
import { Usuario } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  constructor(private guardarUsuariosAdmin: GuardarUsuariosAdminService, private sede: SedeService, private router: Router) { }

  usuarios: Usuario = {
    username: "",
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    tipo_documento: "",
    numero_documento: "",
    celular: "",
    fecha_nacimiento: new Date(),
    sede:"",
    roles: []
  }

  roles:RolesUser = {
    rol: "",
    permisos : []
  }

  Sede: Sede[] = []

  IterarRol: Roles[] = []

  guardarUsuario(){
    if(this.usuarios.username.trim() == '' || this.usuarios.username.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Username', 'error')
      return
    }
    if(this.usuarios.nombres.trim() == '' || this.usuarios.nombres.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Nombre', 'error')
      return
    }
    if(this.usuarios.apellidos.trim() == '' || this.usuarios.apellidos.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Apellido', 'error')
      return
    }
    if(this.usuarios.sede.trim() == '' || this.usuarios.sede.trim() == null){
      Swal.fire('Error', 'Debe de ingresar la Sede', 'error')
      return
    }
    if(this.usuarios.tipo_documento.trim() == '' || this.usuarios.tipo_documento.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Tipo de Documento', 'error')
      return
    }
    if(this.usuarios.numero_documento.trim() == '' || this.usuarios.numero_documento.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Numero de Documento', 'error')
      return
    }    if(this.usuarios.email.trim() == '' || this.usuarios.email.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Correo', 'error')
      return
    }
    if(this.usuarios.celular.trim() == '' || this.usuarios.celular.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Celular', 'error')
      return
    }

    this.guardarUsuariosAdmin.setUsuario(this.usuarios)

    this.router.navigate(['/dashboard-administracion/rolesUsuariosGuardados'])
  }

  
  obtenerSede() {
    this.sede.getSedes().subscribe(
      (data: any) => {
        this.Sede = data
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las Sedes', 'error');
      }
    )
  }

  ngOnInit(): void {


    this.obtenerSede()
  }

}
