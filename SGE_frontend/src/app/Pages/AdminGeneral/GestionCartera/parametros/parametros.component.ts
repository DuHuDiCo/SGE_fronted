import { Component, HostListener, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Campaign } from 'src/app/Types/PanelCartera/campaign';
import { FiltroParametro, FiltrosGenerales } from 'src/app/Types/PanelCartera/filtros';
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
  clients: any[] = [];
  fileContent: string | ArrayBuffer | null = null;

  // OBJETOS
  filtrosGeneralObj: FiltrosGenerales = {
    filtradoByTextPlain: {
      cuentas: [],
      ordenamientoDTO: []
    },
    parametrosFiltradoDTO: {
      bancos: null,
      edadVencimientos: null,
      sede: null,
      juridica: null,
      tipoCredito: null,
      fechaStart: null,
      fechaEnd: null,
      moraStart: null,
      moraEnd: null,
      diasStart: null,
      diasEnd: null,
      totalStart: null,
      totalEnd: null,
      orden: []
    }
  }

  parametrosFiltradoDTO: FiltroParametro = {
    bancos: null,
    edadVencimientos: null,
    sede: null,
    juridica: null,
    tipoCredito: null,
    fechaStart: null,
    fechaEnd: null,
    moraStart: null,
    moraEnd: null,
    diasStart: null,
    diasEnd: null,
    totalStart: null,
    totalEnd: null,
    orden: []
  }

  campaignObj: Campaign = {
    nombreCampania: '',
    parametros: [],
    namesViews: [],
    asesoresId: [],
    parametroOrdenamientoDTOs: [],
    isAsignacion: false,
    tipoCampania: ''
  }

  // VARIABLES
  clientesFiltro: number = 0
  delimitante: string = ''
  fileInput!: any

  constructor(private parametrosService: ParametrosService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.parametros()
    this.getAsesores()
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.hasUnsavedChanges()) {
      $event.returnValue = true;
    }
  }

  hasUnsavedChanges(): boolean {
    return true;
  }

  deleteFiltrosAndBloques() {
    this.parametrosService.deleteCuentas().pipe(
      tap((data: any) => {
      }), catchError((error) => {
        console.error(error)
        return of([])
      })
    ).subscribe()
  }

  parametros() {
    this.deleteFiltrosAndBloques()
    this.parametrosService.getParametros().subscribe(
      (data: any) => {
        this.parametrosArray = data.parametros
        console.log(data);
        this.fillParametrosNoConfirm(data.parametros)
        this.fillOrdenamiento()
        setTimeout(() => {
          this.changeDatos(data.disponibilidad, data.parametros)
          this.bloquearBotones(data.disponibilidad, data.parametros)
        }, 200);
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
  filtrosGenerales(obj: any, subParametro: any, position: number) {
    var paraObj = {
      parametro: obj.parametro,
      position: position,
      subParametros: [
        subParametro.subParametro
      ]
    }

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

    if (this.filtrosGeneralObj.parametrosFiltradoDTO != null) {
      switch (paraObj.parametro) {
        case 'BANCO':
          this.filtrosGeneralObj.parametrosFiltradoDTO.bancos = subParametro.subParametro
          break;
        case 'EDAD VENCIMIENTO':
          this.filtrosGeneralObj.parametrosFiltradoDTO.edadVencimientos = subParametro.subParametro
          break;
        case 'SEDE':
          this.filtrosGeneralObj.parametrosFiltradoDTO.sede = subParametro.subParametro
          break;
        case 'TIPO CLASIFICACION JURIDICA':
          this.filtrosGeneralObj.parametrosFiltradoDTO.juridica = subParametro.subParametro
          break;
        case 'TIPO DE CREDITO':
          this.filtrosGeneralObj.parametrosFiltradoDTO.tipoCredito = subParametro.subParametro
      }

      this.parametrosFiltradoDTO = this.filtrosGeneralObj.parametrosFiltradoDTO
    }

    console.log(this.filtrosGeneralObj);

    this.parametrosService.cuentas(user, this.parametrosFiltradoDTO).subscribe(
      (data: any) => {
        this.clientesFiltro = data.filtradas

        this.parametrosConfirm.push(paraObj)
        console.log(this.parametrosConfirm);
        this.optionConfirm.push(paraObj.parametro)
        this.campaignObj.parametros.push(paraObj)
        this.changeDatos(data, this.parametrosArray)
        this.bloquearBotones(data, this.parametrosArray)
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
        this.filtrosGeneralObj.parametrosFiltradoDTO?.fechaStart + ' - ' + this.filtrosGeneralObj.parametrosFiltradoDTO?.fechaEnd
      ]
    }

    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    if ((this.filtrosGeneralObj.parametrosFiltradoDTO?.fechaStart == null || this.filtrosGeneralObj.parametrosFiltradoDTO?.fechaStart == '') || (this.filtrosGeneralObj.parametrosFiltradoDTO?.fechaEnd == null || this.filtrosGeneralObj.parametrosFiltradoDTO?.fechaEnd == '')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe Seleccionar Las Fechas',
        timer: 3000
      })
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
    var max

    for (let i = 1; i < obj.subParametros.length + 1; i++) {
      if (i == 1) {
        inicio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 2) {
        medio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 3) {
        max = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }
    }

    switch (subParametro.idSubParametro) {
      case 1:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraStart = 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraEnd = subParametro.subParametro
        break;
      case 2:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraStart = Math.floor(inicio.subParametro) + 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraEnd = Math.floor(subParametro.subParametro)
        break;
      case 3:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraStart = Math.floor(medio.subParametro) + 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraEnd = Math.floor(subParametro.subParametro)
        break;
    }
  }

  // FILTRADO POR DIAS
  filtroDias(obj: any, subParametro: any) {
    var inicio
    var medio
    var max

    for (let i = 1; i < obj.subParametros.length + 1; i++) {
      if (i == 1) {
        inicio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 2) {
        medio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 3) {
        max = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }
    }

    switch (subParametro.idSubParametro) {
      case 1:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasStart = 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasEnd = subParametro.subParametro
        break;
      case 2:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasStart = parseInt(inicio.subParametro) + 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasEnd = subParametro.subParametro
        break;
      case 3:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasStart = parseInt(medio.subParametro) + 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasEnd = subParametro.subParametro
        break;
    }
  }

  // FILTRADO POR TOTAL
  filtroTotal(obj: any, subParametro: any) {
    var inicio
    var medio
    var max

    for (let i = 1; i < obj.subParametros.length + 1; i++) {
      if (i == 1) {
        inicio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 2) {
        medio = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }

      if (i == 3) {
        max = obj.subParametros.find((sp: any) => sp.idSubParametro == i)
      }
    }

    switch (subParametro.idSubParametro) {
      case 1:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalStart = 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalEnd = Math.floor(subParametro.subParametro)
        break;
      case 2:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalStart = Math.floor(inicio.subParametro) + 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalEnd = Math.floor(subParametro.subParametro)
        break;
      case 3:
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalStart = Math.floor(medio.subParametro) + 1
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalEnd = Math.floor(subParametro.subParametro)
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
        this.filtrosGeneralObj.parametrosFiltradoDTO!.bancos = null
        break;
      case 'EDAD VENCIMIENTO':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.edadVencimientos = null
        break;
      case 'SEDE':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.sede = null
        break;
      case 'TIPO CLASIFICACION JURIDICA':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.juridica = null
        break;
      case 'TIPO DE CREDITO':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.tipoCredito = null
        break;
      case 'MORA OBLIGATORIA':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraStart = null
        this.filtrosGeneralObj.parametrosFiltradoDTO!.moraEnd = null
        break;
      case 'DIAS VENCIDOS':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasStart = null
        this.filtrosGeneralObj.parametrosFiltradoDTO!.diasEnd = null
        break;
      case 'FECHA VENCIMIENTO':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.fechaStart = null
        this.filtrosGeneralObj.parametrosFiltradoDTO!.fechaEnd = null
        break;
      case 'TOTAL OBLIGACION':
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalStart = null
        this.filtrosGeneralObj.parametrosFiltradoDTO!.totalEnd = null
        break;
    }

    if (this.filtrosGeneralObj.parametrosFiltradoDTO != null) {
      this.parametrosFiltradoDTO = this.filtrosGeneralObj.parametrosFiltradoDTO
    }

    console.log(this.parametrosFiltradoDTO);


    this.parametrosService.cuentas(user, this.parametrosFiltradoDTO).subscribe(
      (data: any) => {
        this.clientesFiltro = data.filtradas

        var posPar = this.optionConfirm.indexOf(parametro)
        this.optionConfirm.splice(posPar, 1)

        var subParFind = this.parametrosConfirm.find((p: any) => p.subParametros[0] == subParametro)

        var position = this.parametrosConfirm.indexOf(subParFind)

        this.parametrosConfirm.splice(position, 1)

        this.deleteParametroCampaign(parametro)
        this.changeDatos(data, this.parametrosArray)
        this.bloquearBotones(data, this.parametrosArray)

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

    if (this.clients.length == 0) {
      this.filtrosGeneralObj.parametrosFiltradoDTO?.orden.push(ordenObj)
    } else {
      this.filtrosGeneralObj.filtradoByTextPlain!.ordenamientoDTO.push(ordenObj)
    }

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

    var objFiltro = this.filtrosGeneralObj.parametrosFiltradoDTO?.orden.find((f: any) => f.parametroOrdenamiento == parametro)
    var positionFiltro = this.filtrosGeneralObj.parametrosFiltradoDTO?.orden.indexOf(objFiltro!)
    this.filtrosGeneralObj.parametrosFiltradoDTO?.orden.splice(positionFiltro!, 1)

    if (this.clients.length > 0) {
      var objFiltroTP = this.filtrosGeneralObj.parametrosFiltradoDTO?.orden.findIndex((f: any) => f.parametroOrdenamiento == parametro)
      this.filtrosGeneralObj.filtradoByTextPlain!.ordenamientoDTO.splice(objFiltroTP!, 1)
    }

    console.log(this.filtrosGeneralObj);
  }

  // CREAR BLOQUE
  createView() {
    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    if (this.filtrosGeneralObj.parametrosFiltradoDTO != null) {
      if (this.filtrosGeneralObj.parametrosFiltradoDTO.bancos == null && this.filtrosGeneralObj.parametrosFiltradoDTO.edadVencimientos == null && this.filtrosGeneralObj.parametrosFiltradoDTO.sede == null && this.filtrosGeneralObj.parametrosFiltradoDTO.juridica == null && this.filtrosGeneralObj.parametrosFiltradoDTO.tipoCredito == null &&
        (this.filtrosGeneralObj.parametrosFiltradoDTO.fechaStart == null && this.filtrosGeneralObj.parametrosFiltradoDTO.fechaEnd == null) && (this.filtrosGeneralObj.parametrosFiltradoDTO.moraStart == null && this.filtrosGeneralObj.parametrosFiltradoDTO.moraEnd == null) && (this.filtrosGeneralObj.parametrosFiltradoDTO.diasStart == null && this.filtrosGeneralObj.parametrosFiltradoDTO.diasEnd == null)
        && (this.filtrosGeneralObj.parametrosFiltradoDTO.totalStart == null && this.filtrosGeneralObj.parametrosFiltradoDTO.totalEnd == null) && this.clients.length == 0
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe Seleccionar Al Menos Una Opción',
          timer: 3000
        })
        return
      }
    }

    if (this.clients.length == 0) {
      if (this.filtrosGeneralObj.parametrosFiltradoDTO?.orden.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Elija al Menos Un Ordenamiento',
          timer: 3000
        })
        return
      }
    } else {
      if (this.filtrosGeneralObj.filtradoByTextPlain!.ordenamientoDTO.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Elija al Menos Un Ordenamiento',
          timer: 3000
        })
        return
      }
    }

    var nameView: string

    if (this.clients.length == 0) {
      this.filtrosGeneralObj.filtradoByTextPlain = null

      nameView = `Bloque_Manual_${this.viewsArray.length + 1}`

    } else {
      this.filtrosGeneralObj.parametrosFiltradoDTO = null

      nameView = `Bloque_Text_Plain_${this.viewsArray.length + 1}`

      for (let i = 0; i < this.clients.length; i++) {
        this.filtrosGeneralObj.filtradoByTextPlain!.cuentas.push(this.clients[i][0])
      }
      console.log(this.filtrosGeneralObj.filtradoByTextPlain!.cuentas);
    }

    console.log(nameView);

    this.parametrosService.cuentasView(nameView, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        console.log(data);
        this.parametrosService.viewUpdate(data.message).subscribe(
          (data: any) => {
            console.log(data);
            this.viewsArray.push(nameView)
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              text: 'Bloque Creado Con Éxito',
              timer: 3000
            })
            this.campaignObj.namesViews = this.viewsArray
            this.changeDatos(data, this.parametrosArray)
            this.bloquearBotones(data, this.parametrosArray)
            this.clientesFiltro = 0
          }, (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al crear el Bloque',
              timer: 3000
            })
            console.log(error);
            return
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
      filtradoByTextPlain: {
        cuentas: [],
        ordenamientoDTO: []
      },
      parametrosFiltradoDTO: {
        bancos: null,
        edadVencimientos: null,
        sede: null,
        juridica: null,
        tipoCredito: null,
        fechaStart: null,
        fechaEnd: null,
        moraStart: null,
        moraEnd: null,
        diasStart: null,
        diasEnd: null,
        totalStart: null,
        totalEnd: null,
        orden: []
      }
    }
  }


  isAsignacion(){
    if(this.campaignObj.isAsignacion){
      this.createCampaingAsignacion()
    }else{
      this.createCampaign()
    }
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

    

    if (this.campaignObj.isAsignacion) {
      if (this.campaignObj.asesoresId.length > 1) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No puede tener más de un asesor',
          timer: 3000
        })
        return
      }
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

    this.campaignObj.tipoCampania ="FILTRADO"

    this.parametrosService.createCampaign(this.campaignObj).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Campaña Creada Con Éxito',
          timer: 3000
        })
        console.log(data);
        this.campaignObj = {
          nombreCampania: '',
          tipoCampania:'',
          parametros: [],
          namesViews: [],
          asesoresId: [],
          parametroOrdenamientoDTOs: [],
          isAsignacion: false
        }
        this.viewsArray = []
        this.clientesFiltro = 0
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear la campaña',
          timer: 3000
        })
        console.log(error);
        return
      }
    )
  }

  createCampaingAsignacion(){
   this.campaignObj.tipoCampania ="ASIGNACION"

    this.parametrosService.asignarcuentas(1,this.campaignObj).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Campaña Creada Con Éxito',
          timer: 3000
        })
        console.log(data);
        this.campaignObj = {
          nombreCampania: '',
          tipoCampania:'',
          parametros: [],
          namesViews: [],
          asesoresId: [],
          parametroOrdenamientoDTOs: [],
          isAsignacion: false
        }
        this.viewsArray = []
        this.clientesFiltro = 0
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear la campaña',
          timer: 3000
        })
        console.log(error);
        return
      }
    ) 
  }



  // ASESORES
  getAsesores() {
    this.parametrosService.getAsesores(23,58).subscribe(
      (data: any) => {
        this.asesoresArray = data
        var admin = this.asesoresArray.find((a: any) => a.nombres == 'admin')
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

  // MANEJO DE BOTONES
  bloquearBotones(newParametros: any, parametrosArray: any) {
    this.desbloquearDisableds(parametrosArray)

    for (let i = 0; i < parametrosArray.length; i++) {

      var obj: any
      var position: number

      parametrosArray[i].subParametros.forEach((element: any) => {
        switch (parametrosArray[i].parametro) {
          case 'BANCO':
            obj = newParametros.bancos.find((b: any) => b.nombre_banco == element.subParametro)
            break;
          case 'TIPO CLASIFICACION JURIDICA':
            obj = newParametros.clasiJuridica.find((cj: any) => cj.clasificacion_obligacion == element.subParametro)
            break;
          case 'EDAD VENCIMIENTO':
            obj = newParametros.edad.find((e: any) => e.edad_vencimiento == element.subParametro)
            break;
          case 'SEDE':
            obj = newParametros.sede.find((s: any) => s.nombre_sede == element.subParametro)
            break;
          case 'TIPO DE CREDITO':
            obj = newParametros.tipoCredito.find((tc: any) => tc.tipo_credito == element.subParametro)
            break;
          case 'MORA OBLIGATORIA':
            obj = newParametros.moraObligatoria.find((mo: any) => mo.mora_range == element.subParametro)
            break;
          case 'DIAS VENCIDOS':
            obj = newParametros.dias.find((d: any) => d.mora_range == element.subParametro)
            break;
          case 'TOTAL OBLIGACION':
            obj = newParametros.totalObligacion.find((to: any) => to.mora_range == element.subParametro)
            break;

        }

        if (obj == undefined) {
          position = parametrosArray[i].subParametros.indexOf(element)

          var boton = document.getElementById(parametrosArray[i].parametro + '-' + element.subParametro + '-' + position);

          if (boton) {
            boton.setAttribute('disabled', 'true');
          }
        }
      });
    }
  }

  desbloquearDisableds(parametrosArray: any) {
    for (let i = 0; i < parametrosArray.length; i++) {
      for (let x = 0; x < parametrosArray[i].subParametros.length; x++) {
        var boton = document.getElementById(parametrosArray[i].parametro + '-' + parametrosArray[i].subParametros[x].subParametro + '-' + x);
        if (boton) {
          boton.removeAttribute('disabled');
        }
      }
    }
  }

  changeDatos(newParametros: any, parametrosArray: any) {
    for (let i = 0; i < parametrosArray.length; i++) {
      if (parametrosArray[i].parametro == 'MORA OBLIGATORIA') {
        parametrosArray[i].subParametros.forEach((element: any) => {
          var obj = newParametros.moraObligatoria.find((mo: any) => mo.sort_order == element.idSubParametro)
          if (obj) {
            obj.mora_range = element.subParametro
          }
        });
      }

      if (parametrosArray[i].parametro == 'DIAS VENCIDOS') {
        parametrosArray[i].subParametros.forEach((element: any) => {
          var obj = newParametros.dias.find((mo: any) => mo.sort_order == element.idSubParametro)
          if (obj) {
            obj.mora_range = element.subParametro
          }
        });
      }

      if (parametrosArray[i].parametro == 'TOTAL OBLIGACION') {
        parametrosArray[i].subParametros.forEach((element: any) => {
          var obj = newParametros.totalObligacion.find((mo: any) => mo.sort_order == element.idSubParametro)
          if (obj) {
            obj.mora_range = element.subParametro
          }
        });
      }
    }
  }

  // LEER Y PROCESAR EL ARCHIVO
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileInput = input

    if (this.delimitante == '' || this.delimitante == undefined || this.delimitante == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione Un Delimitante',
        timer: 3000
      })

      input.value = ''
      return
    }

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result;
      if (typeof this.fileContent === 'string') {
        this.processFileContent(this.fileContent);
      }
    };
    reader.readAsText(file);
  }

  processFileContent(content: string): void {
    const lines = content.split('\n');
    var array = lines.map(line => line.split(this.delimitante));

    if (array[0].length == 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione El Delimiante Correcto',
        timer: 3000
      })


      this.fileInput = this.fileInput.value = ''
      this.delimitante = ''
      return
    }

    for (let i = 0; i < array.length; i++) {
      if (array[i][0] == '' || array[i][0] == null || typeof array[i][0] !== 'string') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hay un número de obligación incorrecto',
          timer: 3000
        })
        this.cancelarArchivo()
        return
      }
      for (let j = 0; j < array[i].length; j++) {
        const element = array[i][j];

        if (element === '' || element === null || typeof element !== 'string') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Faltan datos en el Archivo',
            timer: 3000
          });
          this.cancelarArchivo();
          return;
        }
      }
    }

    this.clients = array
  }

  cancelarArchivo() {
    this.clients = []
    this.delimitante = ''
    this.fileContent = null
    this.fileInput = this.fileInput.value = ''
  }

}
