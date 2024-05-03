import { Component, OnInit } from '@angular/core';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
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
    "diasEnd": null
  }

  constructor(private parametrosService: ParametrosService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.parametros()
  }

  parametros() {
    this.parametrosService.getParametros().subscribe(
      (data: any) => {
        this.parametrosArray = data
        this.fillParametrosNoConfirm(data)
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

  filtrosGenerales(parametro: string, subParametro: string) {

    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    var paraObj = {
      parametro: parametro,
      subParametro: subParametro
    }

    switch (paraObj.parametro) {
      case 'BANCO':
        this.filtrosGeneralObj.bancos = subParametro
        break;
      case 'EDAD VENCIMIENTO':
        this.filtrosGeneralObj.edadVencimientos = subParametro
        break;
      case 'SEDE':
        this.filtrosGeneralObj.sede = subParametro
        break;
      case 'TIPO CLASIFICACION JURIDICA':
        this.filtrosGeneralObj.juridica = subParametro
        break;
      case 'TIPO DE CREDITO':
        this.filtrosGeneralObj.tipoCredito = subParametro
    }

    console.log(this.filtrosGeneralObj);

    this.parametrosService.cuentas(user, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        this.parametrosConfirm.push(paraObj)
        this.optionConfirm.push(paraObj.parametro)
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
    }

    this.parametrosService.cuentas(user, this.filtrosGeneralObj).subscribe(
      (data: any) => {
        var posPar = this.optionConfirm.indexOf(parametro)
        this.optionConfirm.splice(posPar, 1)

        var subParFind = this.parametrosConfirm.find((p: any) => p.subParametro == subParametro)

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

  createView() {
    var user = this.authService.getUsername()
    if (user == null || user == undefined) {
      return
    }

    if (this.filtrosGeneralObj.bancos == null && this.filtrosGeneralObj.edadVencimientos == null && this.filtrosGeneralObj.sede == null && this.filtrosGeneralObj.juridica == null && this.filtrosGeneralObj.tipoCredito == null) {
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
        this.viewsArray.push(`Bloque_${this.viewsArray.length + 1}`)
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Bloque Creado Con Éxito',
          timer: 3000
        })
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

}