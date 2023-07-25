import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  rol:boolean = false;

  constructor() { }

  gestionRoles(){
    this.rol = true;
  }

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
