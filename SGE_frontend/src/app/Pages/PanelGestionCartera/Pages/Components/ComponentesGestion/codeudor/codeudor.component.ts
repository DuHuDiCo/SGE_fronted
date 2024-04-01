import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeudor',
  templateUrl: './codeudor.component.html',
  styleUrls: ['./codeudor.component.css']
})
export class CodeudorComponent implements OnInit {

  datosPorConfirmar: any[] = []
  datosConfirmados: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.datosPorConfirmar = [
      'CELULAR',
      'DIRECCION',
      'CORREO',
      'REF'
    ]
  }

  confirmarDato(dato: string, icon: string) {
    var objDato = {
      dato: dato,
      icon: icon
    }

    if (this.datosPorConfirmar.includes(dato)) {
      var position = this.datosPorConfirmar.indexOf(dato)
      this.datosPorConfirmar.splice(position, 1)
      this.datosConfirmados.push(objDato)
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
