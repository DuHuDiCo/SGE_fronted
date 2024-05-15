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
  ordenamientoConfirm: any[] = []

  combinacionesArray: any[] = []
  combinacionesIguales: any[] = []
  combinacionesPerBloque: any[] = []
  subParamNoCount: any[] = []

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
    nombreCampania: '',
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
        this.fillOrdenamiento()
        console.log(data);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  // LLENAR PARAMETROS SIN CONFIRMAR
  fillParametrosNoConfirm(array: any) {
    for (let i = 0; i < array.length; i++) {
      array[i].subParametros.forEach((element: any) => {
        this.parametrosNoConfirm.push(element.subParametro)
      });
    }
  }

  // LLENAR ORDENAMIENTO
  fillOrdenamiento() {
    for (let i = 0; i < this.parametrosArray.length; i++) {
      var array = this.parametrosArray[i]
      if (array.idParametro == null) {
        this.ordenamientoArray.push(array.parametro)
      }
    }
    this.ordenamientoArray.push('FECHA VENCIMIENTO')
  }

  // FILTROS GENERALES
  filtrosGenerales(obj: any, subParametro: any) {

    var paraObj = {
      parametro: obj.parametro,
      subParametros: [
        subParametro.subParametro
      ]
    }

    this.añadirCombinacion(obj, subParametro)

    if (obj.parametro == 'MORA OBLIGATORIA') {
      this.filtroMora(obj, subParametro)
    }

    if (obj.parametro == 'DIAS VENCIDOS') {
      this.filtroDias(obj, subParametro)
    }

    if (obj.parametro == 'TOTAL OBLIGACION') {
      this.filtroTotal(obj, subParametro)
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
        break;
      case 'DIAS VENCIDOS':
        this.filtrosGeneralObj.diasStart = null
        this.filtrosGeneralObj.diasEnd = null
        break;
      case 'FECHA VENCIMIENTO':
        this.filtrosGeneralObj.fechaStart = null
        this.filtrosGeneralObj.fechaEnd = null
        break;
      case 'TOTAL OBLIGACION':
        this.filtrosGeneralObj.totalStart = null
        this.filtrosGeneralObj.totalEnd = null
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

        this.deleteParametroCampaign(parametro)

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

  // ELIMINAR PARAMETRO DE LA CAMPAÑA AL ELIMINARSE
  deleteParametroCampaign(rol: string) {
    var obj = this.campaignObj.parametros.find((r: any) => r.parametro == rol)

    if (obj != undefined) {
      var position = this.campaignObj.parametros.indexOf(obj)
      this.campaignObj.parametros.splice(position, 1)
    }

    console.log(obj);

  }

  // ORDENAR
  asignarOrdenamiento(parametro: string, orden: string) {
    var ordenObj = {
      parametroOrdenamiento: parametro,
      direccionOrdenamiento: orden,
      bloque: `Bloque_${this.viewsArray.length + 1}`
    }

    this.filtrosGeneralObj.orden.push(ordenObj)

    this.campaignObj.parametroOrdenamientoDTOs.push(ordenObj)
    this.ordenamientoConfirm.push(parametro)

    console.log(this.filtrosGeneralObj);
  }

  // DELETE ORDENAMIENTO DE CAMPAÑA
  deleteOrdenamientoCampaign(parametro: string) {
    var objCampaign = this.campaignObj.parametroOrdenamientoDTOs.find((o: any) => o.parametroOrdenamiento == parametro)
    if (objCampaign != undefined) {
      var positionCampaign = this.campaignObj.parametroOrdenamientoDTOs.indexOf(objCampaign)
      this.campaignObj.parametroOrdenamientoDTOs.splice(positionCampaign, 1)
    }

    var objArray = this.ordenamientoConfirm.find((or: any) => or == parametro)
    var positionArray = this.ordenamientoConfirm.indexOf(objArray)
    this.ordenamientoConfirm.splice(positionArray, 1)

    var objFiltro = this.filtrosGeneralObj.orden.find((f: any) => f.parametroOrdenamiento == parametro)
    var positionFiltro = this.filtrosGeneralObj.orden.indexOf(objFiltro)
    this.filtrosGeneralObj.orden.splice(positionFiltro, 1)

    console.log(this.ordenamientoArray);
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


    this.parametrosService.cuentasView(`Bloque_${Math.floor(Math.random() * 100) + 1}`, this.filtrosGeneralObj).subscribe(
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
            this.bloquearBotones()
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
    this.ordenamientoConfirm = []

    this.filtrosGeneralObj = {
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
    if (this.campaignObj.asesoresId.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe Asignar Los Asesores',
        timer: 3000
      })
      return
    }

    if (this.campaignObj.nombreCampania == null || this.campaignObj.nombreCampania == '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe darle un nombre a la campaña',
        timer: 3000
      })
      return
    }

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

  añadirCombinacion(obj: any, subParametro: any) {

    var arrayComb: any[] = []
    var parametros = {
      parametro: obj.parametro,
      subParametro: subParametro.subParametro
    }

    arrayComb.push(parametros)

    if (this.viewsArray.length > 0) {
      var ids: any[] = []

      this.combinacionesArray.forEach(element => {
        ids.push(element.numeroComb)
      });

      for (let x = 0; x < this.combinacionesArray.length; x++) {

        console.log(ids);

        for (let y = 0; y < ids.length; y++) {
          if (this.combinacionesArray[x].numeroComb == ids[y] && this.combinacionesIguales.length == 0) {
            this.combinacionesIguales.push(this.combinacionesArray[x])
          }

          if (this.combinacionesArray[x].numeroComb == ids[y] && this.combinacionesIguales.length > 0) {
            if (!this.combinacionesIguales.includes(this.combinacionesArray[x])) {
              this.combinacionesIguales.push(this.combinacionesArray[x])
            }
          }
          if (this.combinacionesIguales.length > 0) {
            var subParametroActual = this.combinacionesIguales.find((c: any) => c.subParametro == subParametro.subParametro)
            console.log(subParametroActual);

            if (this.combinacionesIguales.includes(subParametroActual)) {
              for (let s = 0; s < this.combinacionesIguales.length; s++) {
                if (this.combinacionesIguales[s].subParametro != subParametroActual) {
                  var objParam = this.parametrosArray.find((p: any) => p.parametro == this.combinacionesIguales[s].parametro)
                  console.log(objParam);

                  var objSubParam = objParam.subParametros.find((p: any) => p.subParametro == this.combinacionesIguales[s].subParametro)
                  console.log(objSubParam);

                  var posSubParam = objParam.subParametros.indexOf(objSubParam)
                  console.log(posSubParam);

                  console.log(this.combinacionesIguales[s]);

                  var boton = document.getElementById(objSubParam.subParametro + posSubParam);
                  if (boton != null && boton != undefined) {
                    boton.setAttribute('disabled', 'true');
                  }
                }
              }
            }
          }
          console.log(this.combinacionesIguales);
        }
      }

    }


    if (arrayComb.length != 0) {
      for (let i = 0; i < arrayComb.length; i++) {
        var combinacion = {
          numeroComb: this.viewsArray.length + 1,
          parametro: arrayComb[i].parametro,
          subParametro: arrayComb[i].subParametro
        }

        this.combinacionesArray.push(combinacion)
        this.combinacionesPerBloque.push(combinacion)
      }
    }
    console.log(this.combinacionesArray);


  }

  bloquearBotones() {
    var botonDisabled: any[] = []

    if (this.combinacionesPerBloque.length == 1) {
      var objParam = this.parametrosArray.find((p: any) => p.parametro == this.combinacionesArray[0].parametro)
      console.log(objParam);

      var objSubParam = objParam.subParametros.find((p: any) => p.subParametro == this.combinacionesArray[0].subParametro)
      console.log(objSubParam);

      var posSubParam = objParam.subParametros.indexOf(objSubParam)
      console.log(posSubParam);

      var boton = document.getElementById(objSubParam.subParametro + posSubParam);
      if (boton != null && boton != undefined) {
        boton.setAttribute('disabled', 'true');
      }

      botonDisabled.push(this.combinacionesArray[0])
      this.combinacionesPerBloque.splice(0, 1)
    }

    console.log(this.combinacionesArray);

    if (this.combinacionesArray.length > 1) {
      for (let i = 0; i < this.combinacionesArray.length; i++) {
        var objParam = this.parametrosArray.find((p: any) => p.parametro == this.combinacionesArray[i].parametro)
        console.log(objParam);

        var objSubParam = objParam.subParametros.find((p: any) => p.subParametro == this.combinacionesArray[i].subParametro)
        console.log(objSubParam);

        var posSubParam = objParam.subParametros.indexOf(objSubParam)
        console.log(posSubParam);

        var boton = document.getElementById(objSubParam.subParametro + posSubParam);
        if (boton != null && boton != undefined) {
          boton.removeAttribute('disabled');
        }

      }
    }

    console.log(this.combinacionesPerBloque);

    for (let x = 0; x < this.combinacionesPerBloque.length; x++) {
      this.combinacionesPerBloque.splice(x, 1)
    }
  }

}
