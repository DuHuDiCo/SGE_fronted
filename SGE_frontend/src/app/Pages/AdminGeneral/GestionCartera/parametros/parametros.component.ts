import { Component, OnInit } from '@angular/core';
import { ParametrosService } from 'src/app/Services/AdminCartera/parametros.service';

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

  constructor(private parametrosService: ParametrosService) { }

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
    var paraObj = {
      parametro: parametro,
      subParametro: subParametro
    }
    this.parametrosConfirm.push(paraObj)
    this.optionConfirm.push(paraObj.parametro)

    console.log(this.parametrosConfirm);


    // this.parametrosService.filtrosGenerales(this.filtrosGeneralObj).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //   }, (error: any) => {
    //     console.log(error);
    //   }
    // )
  }

  deleteFiltro(parametro: string, subParametro: string) {
    console.log(parametro);
    console.log(subParametro);


    var posPar = this.optionConfirm.indexOf(parametro)
    this.optionConfirm.splice(posPar, 1)
    console.log(posPar);

    var subParFind = this.parametrosConfirm.find((p: any) => p.subParametro == subParametro)

    var position = this.parametrosConfirm.indexOf(subParFind)
    this.parametrosConfirm.splice(position, 1)

    console.log(this.parametrosConfirm);

  }

}
