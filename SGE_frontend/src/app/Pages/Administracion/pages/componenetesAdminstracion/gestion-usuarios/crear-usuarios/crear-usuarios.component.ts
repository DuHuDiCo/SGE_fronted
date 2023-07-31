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

    this.rol = true;
  }



  rol: boolean = false;


  validar = {
    cartera: false,
    ventas: false,
    servicios: false,
    consignaciones: false,
    caja: false,
    administracion: false,
    archivo: false,
  };

  objectGeneral = {
    cartera: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
    ventas: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
    servicios: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
    consignaciones: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
    caja: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
    administracion: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
    archivo: {
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
    },
  };

  select = {
    cartera:false,
    caja:false,
    ventas:false,
    servicios:false,
    consignaciones:false,
    administracion:false,
    archivo:false,
  };

  ngOnInit(): void {}

  validarCheck(rol: any) {
    switch (rol) {
      case 'cartera':
        if (this.select.cartera == true) {
          this.objectGeneral.cartera.p1 = true;
          this.objectGeneral.cartera.p2 = true;
          this.objectGeneral.cartera.p3 = true;
          this.objectGeneral.cartera.p4 = true;
          this.objectGeneral.cartera.p5 = true;
          this.objectGeneral.cartera.p6 = true;
        } else if (this.select.cartera == false) {
          this.objectGeneral.cartera.p1 = false;
          this.objectGeneral.cartera.p2 = false;
          this.objectGeneral.cartera.p3 = false;
          this.objectGeneral.cartera.p4 = false;
          this.objectGeneral.cartera.p5 = false;
          this.objectGeneral.cartera.p6 = false;
        }
        break;

      case 'caja':
        if (this.select.caja == true) {
          this.objectGeneral.caja.p1 = true;
          this.objectGeneral.caja.p2 = true;
          this.objectGeneral.caja.p3 = true;
          this.objectGeneral.caja.p4 = true;
          this.objectGeneral.caja.p5 = true;
          this.objectGeneral.caja.p6 = true;
        } else if (this.select.caja == false) {
          this.objectGeneral.caja.p1 = false;
          this.objectGeneral.caja.p2 = false;
          this.objectGeneral.caja.p3 = false;
          this.objectGeneral.caja.p4 = false;
          this.objectGeneral.caja.p5 = false;
          this.objectGeneral.caja.p6 = false;
        }
        break;
        
      case 'ventas':
        if (this.select.ventas == true) {
          this.objectGeneral.ventas.p1 = true;
          this.objectGeneral.ventas.p2 = true;
          this.objectGeneral.ventas.p3 = true;
          this.objectGeneral.ventas.p4 = true;
          this.objectGeneral.ventas.p5 = true;
          this.objectGeneral.ventas.p6 = true;
        } else if (this.select.ventas == false) {
          this.objectGeneral.ventas.p1 = false;
          this.objectGeneral.ventas.p2 = false;
          this.objectGeneral.ventas.p3 = false;
          this.objectGeneral.ventas.p4 = false;
          this.objectGeneral.ventas.p5 = false;
          this.objectGeneral.ventas.p6 = false;
        }
        break;
        
      case 'servicios':
        if (this.select.servicios == true) {
          this.objectGeneral.servicios.p1 = true;
          this.objectGeneral.servicios.p2 = true;
          this.objectGeneral.servicios.p3 = true;
          this.objectGeneral.servicios.p4 = true;
          this.objectGeneral.servicios.p5 = true;
          this.objectGeneral.servicios.p6 = true;
        } else if (this.select.servicios == false) {
          this.objectGeneral.servicios.p1 = false;
          this.objectGeneral.servicios.p2 = false;
          this.objectGeneral.servicios.p3 = false;
          this.objectGeneral.servicios.p4 = false;
          this.objectGeneral.servicios.p5 = false;
          this.objectGeneral.servicios.p6 = false;
        }
        break;
        
      case 'archivo':
        if (this.select.archivo == true) {
          this.objectGeneral.archivo.p1 = true;
          this.objectGeneral.archivo.p2 = true;
          this.objectGeneral.archivo.p3 = true;
          this.objectGeneral.archivo.p4 = true;
          this.objectGeneral.archivo.p5 = true;
          this.objectGeneral.archivo.p6 = true;
        } else if (this.select.archivo == false) {
          this.objectGeneral.archivo.p1 = false;
          this.objectGeneral.archivo.p2 = false;
          this.objectGeneral.archivo.p3 = false;
          this.objectGeneral.archivo.p4 = false;
          this.objectGeneral.archivo.p5 = false;
          this.objectGeneral.archivo.p6 = false;
        }
        break;
        
      case 'consignaciones':
        if (this.select.consignaciones == true) {
          this.objectGeneral.consignaciones.p1 = true;
          this.objectGeneral.consignaciones.p2 = true;
          this.objectGeneral.consignaciones.p3 = true;
          this.objectGeneral.consignaciones.p4 = true;
          this.objectGeneral.consignaciones.p5 = true;
          this.objectGeneral.consignaciones.p6 = true;
        } else if (this.select.consignaciones == false) {
          this.objectGeneral.consignaciones.p1 = false;
          this.objectGeneral.consignaciones.p2 = false;
          this.objectGeneral.consignaciones.p3 = false;
          this.objectGeneral.consignaciones.p4 = false;
          this.objectGeneral.consignaciones.p5 = false;
          this.objectGeneral.consignaciones.p6 = false;
        }
        break;
        
      case 'administracion':
        if (this.select.administracion == true) {
          this.objectGeneral.administracion.p1 = true;
          this.objectGeneral.administracion.p2 = true;
          this.objectGeneral.administracion.p3 = true;
          this.objectGeneral.administracion.p4 = true;
          this.objectGeneral.administracion.p5 = true;
          this.objectGeneral.administracion.p6 = true;
        } else if (this.select.administracion == false) {
          this.objectGeneral.administracion.p1 = false;
          this.objectGeneral.administracion.p2 = false;
          this.objectGeneral.administracion.p3 = false;
          this.objectGeneral.administracion.p4 = false;
          this.objectGeneral.administracion.p5 = false;
          this.objectGeneral.administracion.p6 = false;
        }
        break;
        
      default:
        break;
    }
  }

}
