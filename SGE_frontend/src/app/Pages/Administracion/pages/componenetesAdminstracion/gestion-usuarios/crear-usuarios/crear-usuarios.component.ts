import { Component, OnInit } from '@angular/core';
import { GuardarUsuariosAdminService } from 'src/app/Services/guardarUsuariosAdmin/guardar-usuarios-admin.service';
import { RolesUser } from 'src/app/Types/Roles';
import { Usuario } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  constructor(private guardarUsuariosAdmin: GuardarUsuariosAdminService) { }

  usuario: Usuario = {
    username: "",
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    tipo_documento: "",
    numero_documento: "",
    celular: "",
    fecha_nacimiento: new Date(),
    roles: []
  }

  roles:RolesUser = {
    rol: "",
    permisos : []
  }

  guardarUsuario(){
    if(this.usuario.username.trim() == '' || this.usuario.username.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el Username', 'error')
      return
    }
    if(this.usuario.password.trim() == '' || this.usuario.password.trim() == null){
      Swal.fire('Error', 'Debe de ingresar la contraseña', 'error')
      return
    }
    if(this.usuario.nombres.trim() == '' || this.usuario.nombres.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el nombre', 'error')
      return
    }
    if(this.usuario.apellidos.trim() == '' || this.usuario.apellidos.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el apellido', 'error')
      return
    }
    if(this.usuario.tipo_documento.trim() == '' || this.usuario.tipo_documento.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el tipo de documento', 'error')
      return
    }
    if(this.usuario.numero_documento.trim() == '' || this.usuario.numero_documento.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el numero de documento', 'error')
      return
    }    if(this.usuario.email.trim() == '' || this.usuario.email.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el correo', 'error')
      return
    }
    if(this.usuario.celular.trim() == '' || this.usuario.celular.trim() == null){
      Swal.fire('Error', 'Debe de ingresar el celular', 'error')
      return
    }

    this.guardarUsuariosAdmin.setUsuario(this.usuario)
  }

  ngOnInit(): void {}

}
