import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {

  // ARRAYS
  datosPorConfirmar: string[] = []
  datosConfirmados: any[] = []

  celArray: string[] = []
  direccionArray: string[] = []
  correoArray: string[] = []
  refArray: string[] = []
  infol: string[] = []

  // VARIABLES
  actionDato: string = ''

  constructor() { }

  ngOnInit(): void {
    this.datosPorConfirmar = [
      'CALL-CEL',
      'WHATSAPP-CEL',
      'MSG-CEL',
      'LETTER-ADDRESS'
    ]
  }

  asignarAccion(accion: string) {
    this.actionDato = accion
    console.log(this.actionDato);
  }

  confirmarDato(dato: string, icon: string) {
    var objDato = {
      dato: dato,
      icon: icon
    }

    console.log(objDato);

    if (this.datosPorConfirmar.includes(dato)) {
      var position = this.datosPorConfirmar.indexOf(dato)
      this.datosPorConfirmar.splice(position, 1)
      this.datosConfirmados.push(objDato)

      if (icon == 'fa-solid fa-eraser') {
        this.celArray.push(dato)
        if (this.celArray.length == 3) {

        }
      }
    }
    console.log(this.datosConfirmados);
  }

  cancelDato(dato: any) {
    if (this.datosConfirmados.includes(dato)) {
      var pos = this.datosConfirmados.indexOf(dato)
      this.datosConfirmados.splice(pos, 1)
      this.datosPorConfirmar.push(dato.dato)
    }
    console.log(this.datosPorConfirmar);

  }

}
