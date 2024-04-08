import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeudor',
  templateUrl: './codeudor.component.html',
  styleUrls: ['./codeudor.component.css']
})
export class CodeudorComponent implements OnInit {

  // ARRAYS
  datosPorConfirmar: string[] = []
  datosConfirmados: any[] = []

  celArray: string[] = []
  direccionArray: string[] = []
  correoArray: string[] = []
  refArray: string[] = []
  infolArray: string[] = []

  disabledArray: boolean[] = [
    true,
    true,
    true,
    true,
    true,
  ]

  // VARIABLES
  actionDato: string = ''
  actionIcon: string = ''
  actionText: string = ''

  constructor() { }

  ngOnInit(): void {
    this.datosPorConfirmar = [
      'CEL',
      'CALL-CEL',
      'WHATSAPP-CEL',
      'MSG-CEL',
      'LETTER-ADDRESS',

      'DIRECCION',
      'LETTER-ADDRESS',

      'CORREO',
      'EMAIL(AUT)-EMAIL',
      'EMAIL-EMAIL',

      'REF',
      'CALL-REF',

      'INFOL',
      'CALL-INFO',
      'WHATSAPP-INFO',
      'MSG-INFO',
      'EMAIL-INFO'
    ]
  }

  asignarAccion(accion: string, icon: string, type: string, text: string) {
    this.actionDato = accion
    this.actionIcon = icon
    this.actionText = text

    switch (type) {
      case 'CEL':
        for (let i = 0; i < this.disabledArray.length; i++) {
          if (i == 0) {
            this.disabledArray[i] = false
          } else {
            this.disabledArray[i] = true
          }
        }
        break;
      case 'DIRECCION':
        for (let i = 0; i < this.disabledArray.length; i++) {
          if (i == 1) {
            this.disabledArray[i] = false
          } else {
            this.disabledArray[i] = true
          }
        }
        break;
      case 'CORREO':
        for (let i = 0; i < this.disabledArray.length; i++) {
          if (i == 2) {
            this.disabledArray[i] = false
          } else {
            this.disabledArray[i] = true
          }
        }
        break;
      case 'REF':
        for (let i = 0; i < this.disabledArray.length; i++) {
          if (i == 3) {
            this.disabledArray[i] = false
          } else {
            this.disabledArray[i] = true
          }
        }
        break;
      case 'INFOL':
        for (let i = 0; i < this.disabledArray.length; i++) {
          if (i == 4) {
            this.disabledArray[i] = false
          } else {
            this.disabledArray[i] = true
          }
        }
        break;
    }
  }

  confirmarDato(type: string) {
    var objDato = {
      dato: this.actionDato,
      icon: this.actionIcon,
      text: this.actionText,
      type: type
    }

    for (let i = 0; i < this.disabledArray.length; i++) {
      this.disabledArray[i] = true
    }

    if (this.datosPorConfirmar.includes(this.actionDato)) {
      var position = this.datosPorConfirmar.indexOf(this.actionDato)
      this.datosPorConfirmar.splice(position, 1)
      this.datosConfirmados.unshift(objDato)

      if (type == 'CEL') {
        this.celArray.push(this.actionDato)
        if (this.celArray.length == 3) {
          var positionD = this.datosPorConfirmar.indexOf('CEL')
          this.datosPorConfirmar.splice(positionD, 1)
        }
      }

      if (type == 'DIRECCION') {
        this.direccionArray.push(this.actionDato)
        console.log(this.direccionArray.length);
        if (this.direccionArray.length == 1) {
          var positionD = this.datosPorConfirmar.indexOf('DIRECCION')
          this.datosPorConfirmar.splice(positionD, 1)
        }
      }

      if (type == 'CORREO') {
        this.correoArray.push(this.actionDato)
        if (this.correoArray.length == 2) {
          var positionD = this.datosPorConfirmar.indexOf('CORREO')
          this.datosPorConfirmar.splice(positionD, 1)
        }
      }

      if (type == 'REF') {
        this.refArray.push(this.actionDato)
        if (this.refArray.length == 1) {
          var positionD = this.datosPorConfirmar.indexOf('REF')
          this.datosPorConfirmar.splice(positionD, 1)
        }
      }

      if (type == 'INFOL') {
        this.infolArray.push(this.actionDato)
        if (this.infolArray.length == 4) {
          var positionD = this.datosPorConfirmar.indexOf('INFOL')
          this.datosPorConfirmar.splice(positionD, 1)
        }
      }
    }
    console.log(this.datosConfirmados);
    this.actionDato = ''
    this.actionIcon = ''
  }

  cancelDato(dato: any) {
    var array: string[] = []

    if (this.datosConfirmados.includes(dato)) {
      var pos = this.datosConfirmados.indexOf(dato)
      this.datosConfirmados.splice(pos, 1)
      this.datosPorConfirmar.push(dato.dato)
      if (!this.datosPorConfirmar.includes(dato.type)) {
        this.datosPorConfirmar.push(dato.type)
      }

      switch (dato.type) {
        case 'CEL':
          array = this.celArray
          break;
        case 'DIRECCION':
          array = this.direccionArray
          break;
        case 'CORREO':
          array = this.correoArray
          break;
        case 'REF':
          array = this.refArray
          break;
        case 'INFOL':
          array = this.infolArray
          break;
      }

      if (dato.type == dato.type) {
        var position = array.indexOf(dato.dato)
        array.splice(position, 1)
      }
    }
    console.log(this.datosPorConfirmar);
  }
}
