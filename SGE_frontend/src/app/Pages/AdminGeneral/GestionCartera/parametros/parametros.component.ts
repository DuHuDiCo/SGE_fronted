import { Component, OnInit } from '@angular/core';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Campaign } from 'src/app/Types/PanelCartera/campaign';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  // ARRAYS
  parametrosArray: any[] = []
  parametrosNoConfirm: any[] = []
  parametrosConfirm: any[] = []
  optionConfirm: string[] = []
  viewsArray: string[] = []
  asesoresArray: any[] = []

  ordenamientoArray: any[] = []

  // OBJETOS
  filtrosGeneralObj: any = {
    "bancos": null,
    "edadVencimientos": null,
    "sede": null,
    "juridica": null,
    "tipoCredito": null,
    "fechaStart": null,
    "fechaEnd": null,
    "moraStart": null,
    "moraEnd": null,
    "diasStart": null,
    "diasEnd": null,
    orden: []
  }

  campaignObj: Campaign = {
    nombreCampaña: '',
    parametros: [],
    namesViews: [],
    asesoresId: [],
    parametroOrdenamientoDTOs: []
  }

  // VARIABLES
  clientesFiltro: number = 0

  constructor(private parametrosService: ParametrosService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.parametros()
    this.getAsesores()
  }

  parametros() {
    this.parametrosService.getParametros().subscribe(
      (data: any) => {
        this.parametrosArray = data.parametros
        this.fillParametrosNoConfirm(data.parametros)
        console.log(data);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  fillParametrosNoConfirm(array: any) {
    for (let i = 0; i < array.length; i++) {
      array[i].subParametros.forEach((element: any) => {
        this.parametrosNoConfirm.push(element.subParametro)
      });
    }
  }

  // FILTROS GENERALES
  filtrosGenerales(obj: any, subParametro: any) {

    var paraObj = {
      parametro: obj.parametro,
      subParametros: [
        subParametro.subParametro
      ]
    }

    if (obj.parametro == 'MORA OBLIGATORIA') {
      this.filtroMora(obj, subParametro)
      this.ordenamientoArray.push(paraObj.parametro)
    }

    if (obj.parametro == 'DIAS VENCIDOS') {
      this.filtroDias(obj, subParametro)
      this.ordenamientoArray.push(paraObj.parametro)
    }

    if (obj.parametro == 'TOTAL OBLIGACION') {
      this.filtroTotal(obj, subParametro)
      this.ordenamientoArray.push(paraObj.parametro)
    }

    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    switch (paraObj.parametro) {
      case 'BANCO':
        this.filtrosGeneralObj.bancos = subParametro.subParametro
        break;
      case 'EDAD VENCIMIENTO':
        this.filtrosGeneralObj.edadVencimientos = subParametro.subParametro
        break;
      case 'SEDE':
        this.filtrosGeneralObj.sede = subParametro.subParametro
        break;
      case 'TIPO CLASIFICACION JURIDICA':
        this.filtrosGeneralObj.juridica = subParametro.subParametro
        break;
      case 'TIPO DE CREDITO':
        this.filtrosGeneralObj.tipoCredito = subParametro.subParametro
    }

    console.log(this.filtrosGeneralObj);

    this.parametrosService.cuentas(user, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        this.clientesFiltro = data
        this.parametrosConfirm.push(paraObj)
        this.optionConfirm.push(paraObj.parametro)
        this.campaignObj.parametros.push(paraObj)
        console.log(this.parametrosConfirm);
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Filtrar',
          timer: 3000
        })
      }
    )
  }

  // FILTRADO FECHA
  filtroFecha(parametro: string) {
    var paraObj = {
      parametro: parametro,
      subParametros: [
        this.filtrosGeneralObj.fechaStart + ' - ' + this.filtrosGeneralObj.fechaEnd
      ]
    }

    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    console.log(this.filtrosGeneralObj);

    this.parametrosService.cuentas(user, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        this.clientesFiltro = data
        this.parametrosConfirm.push(paraObj)
        this.optionConfirm.push(paraObj.parametro)
        this.campaignObj.parametros.push(paraObj)
        this.ordenamientoArray.push(paraObj.parametro)
        console.log(this.parametrosConfirm);
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Filtrar',
          timer: 3000
        })
      }
    )
  }

  // FILTRADO POR MORA
  filtroMora(obj: any, subParametro: any) {
    var inicio
    var medio
    var fin
    var max

    for (let i = 1; i < obj.subParametros.length + 1; i++) {
      if (i == 1) {
        inicio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 2) {
        medio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 3) {
        fin = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 4) {
        max = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }
    }

    switch (subParametro.idSubParametro) {
      case 1:
        this.filtrosGeneralObj.moraStart = 1
        this.filtrosGeneralObj.moraEnd = subParametro.subParametro
        break;
      case 2:
        this.filtrosGeneralObj.moraStart = inicio.subParametro
        this.filtrosGeneralObj.moraEnd = subParametro.subParametro
        break;
      case 3:
        this.filtrosGeneralObj.moraStart = subParametro.subParametro
        this.filtrosGeneralObj.moraEnd = max.subParametro
        break;
    }
  }

  // FILTRADO POR DIAS
  filtroDias(obj: any, subParametro: any) {
    var inicio
    var medio
    var fin
    var max

    for (let i = 1; i < obj.subParametros.length + 1; i++) {
      if (i == 1) {
        inicio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 2) {
        medio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 3) {
        fin = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 4) {
        max = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }
    }

    switch (subParametro.idSubParametro) {
      case 1:
        this.filtrosGeneralObj.diasStart = 1
        this.filtrosGeneralObj.diasEnd = subParametro.subParametro
        break;
      case 2:
        this.filtrosGeneralObj.diasStart = inicio.subParametro
        this.filtrosGeneralObj.diasEnd = subParametro.subParametro
        break;
      case 3:
        this.filtrosGeneralObj.diasStart = subParametro.subParametro
        this.filtrosGeneralObj.diasEnd = max.subParametro
        break;
    }
  }

  // FILTRADO POR TOTAL
  filtroTotal(obj: any, subParametro: any) {
    var inicio
    var medio
    var fin
    var max

    for (let i = 1; i < obj.subParametros.length + 1; i++) {
      if (i == 1) {
        inicio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 2) {
        medio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 3) {
        fin = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 4) {
        max = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }
    }

    switch (subParametro.idSubParametro) {
      case 1:
        this.filtrosGeneralObj.totalStart = 1
        this.filtrosGeneralObj.totalEnd = subParametro.subParametro
        break;
      case 2:
        this.filtrosGeneralObj.totalStart = inicio.subParametro
        this.filtrosGeneralObj.totalEnd = subParametro.subParametro
        break;
      case 3:
        this.filtrosGeneralObj.totalStart = subParametro.subParametro
        this.filtrosGeneralObj.totalEnd = max.subParametro
        break;
    }
  }

  // BORRAR FILTRO
  deleteFiltro(parametro: string, subParametro: string) {
    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    switch (parametro) {
      case 'BANCO':
        this.filtrosGeneralObj.bancos = null
        break;
      case 'EDAD VENCIMIENTO':
        this.filtrosGeneralObj.edadVencimientos = null
        break;
      case 'SEDE':
        this.filtrosGeneralObj.sede = null
        break;
      case 'TIPO CLASIFICACION JURIDICA':
        this.filtrosGeneralObj.juridica = null
        break;
      case 'TIPO DE CREDITO':
        this.filtrosGeneralObj.tipoCredito = null
        break;
      case 'MORA OBLIGATORIA':
        this.filtrosGeneralObj.moraStart = null
        this.filtrosGeneralObj.moraEnd = null
        this.deleteOrdenamiento(parametro)
        break;
      case 'DIAS VENCIDOS':
        this.filtrosGeneralObj.diasStart = null
        this.filtrosGeneralObj.diasEnd = null
        this.deleteOrdenamiento(parametro)
        break;
      case 'FECHA VENCIMIENTO':
        this.filtrosGeneralObj.fechaStart = null
        this.filtrosGeneralObj.fechaEnd = null
        this.deleteOrdenamiento(parametro)
        break;
      case 'TOTAL OBLIGACION':
        this.filtrosGeneralObj.totalStart = null
        this.filtrosGeneralObj.totalEnd = null
        this.deleteOrdenamiento(parametro)
        break;
    }

    console.log(this.filtrosGeneralObj);


    this.parametrosService.cuentas(user, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        this.clientesFiltro = data

        var posPar = this.optionConfirm.indexOf(parametro)
        this.optionConfirm.splice(posPar, 1)

        var subParFind = this.parametrosConfirm.find((p: any) => p.subParametros[0] == subParametro)

        var position = this.parametrosConfirm.indexOf(subParFind)


        this.parametrosConfirm.splice(position, 1)
        console.log(this.parametrosConfirm);
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Filtrar',
          timer: 3000
        })
      }
    )
  }

  // METODO PARA ELIMINAR DEL ARRAY DE ORDENAMIENTO
  deleteOrdenamiento(parametro: string) {
    var position = this.ordenamientoArray.indexOf(parametro)
    this.ordenamientoArray.splice(position, 1)
  }

  // ORDENAR
  asignarOrdenamiento(parametro: string, orden: string) {
    var ordenObj = {
      parametroOrdenamiento: parametro,
      direccionOrdenamiento: orden,
      bloque: `Bloque_${this.viewsArray.length + 1}`
    }

    this.filtrosGeneralObj.orden.push(ordenObj)

    var position = this.ordenamientoArray.indexOf(parametro)
    this.ordenamientoArray.splice(position, 1)

    console.log(this.filtrosGeneralObj);
  }

  // CREAR BLOQUE
  createView() {
    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    if (this.filtrosGeneralObj.bancos == null && this.filtrosGeneralObj.edadVencimientos == null && this.filtrosGeneralObj.sede == null && this.filtrosGeneralObj.juridica == null && this.filtrosGeneralObj.tipoCredito == null &&
      (this.filtrosGeneralObj.fechaStart == null && this.filtrosGeneralObj.fechaEnd == null) && (this.filtrosGeneralObj.moraStart == null && this.filtrosGeneralObj.moraEnd == null) && (this.filtrosGeneralObj.diasStart == null && this.filtrosGeneralObj.diasEnd == null)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe Seleccionar Al Menos Una Opción',
        timer: 3000
      })
      return
    }

    console.log(`Bloque_${this.viewsArray.length + 1}`);


    this.parametrosService.cuentasView(`Bloque_${this.viewsArray.length + 1}`, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        console.log(data);
        this.parametrosService.viewUpdate(data.message).subscribe(
          (data: any) => {
            console.log(data);
            this.viewsArray.push(`Bloque_${this.viewsArray.length + 1}`)
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              text: 'Bloque Creado Con Éxito',
              timer: 3000
            })
            this.campaignObj.namesViews = this.viewsArray
          }, (error: any) => {
            console.log(error);
          }
        )
      }, (error: any) => {
        console.log(error);
      }
    )

    this.optionConfirm = []
    this.parametrosConfirm = []

    this.filtrosGeneralObj = {
      "bancos": null,
      "edadVencimientos": null,
      "sede": null,
      "juridica": null,
      "tipoCredito": null,
    }

    this.parametrosService.cuentas(user, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Filtrar',
          timer: 3000
        })
      }
    )
  }

  // CREAR CAMPAÑA
  createCampaign() {
    console.log(this.viewsArray);

    this.parametrosService.createCampaign(this.campaignObj).subscribe(
      (data: any) => {
        console.log(data);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  // ASESORES
  getAsesores() {
    this.parametrosService.getAsesores().subscribe(
      (data: any) => {
        this.asesoresArray = data
        var admin = this.asesoresArray.find((a: any) => a.usuario.nombres == 'admin')
        var pos = this.asesoresArray.indexOf(admin)
        this.asesoresArray.splice(pos, 1)
        console.log(this.asesoresArray);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  // ASIGNAR ASESOR
  asignarAsesor(asesorId: number) {
    if (this.campaignObj.asesoresId.includes(asesorId)) {
      var position = this.campaignObj.asesoresId.indexOf(asesorId)
      this.campaignObj.asesoresId.splice(position, 1)
    } else {
      this.campaignObj.asesoresId.push(asesorId)
    }
    console.log(this.campaignObj);

  }

}
