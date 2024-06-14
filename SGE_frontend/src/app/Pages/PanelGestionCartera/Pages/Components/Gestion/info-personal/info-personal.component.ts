import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { data } from 'jquery';
import { catchError, of, tap } from 'rxjs';
import { PanelCarteraService } from 'src/app/Services/PanelCartera/panel-cartera.service';
import { Responsables } from 'src/app/Types/PanelCartera/clienteObject';

declare var $: any

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {

  // VARIABLES
  infoPersonal: boolean = false
  saldos: boolean = false
  btn!: boolean

  actionDato: string = ''
  actionIcon: string = ''
  actionText: string = ''
  tipoGarante: string = 'TITULAR'

  // ARRAYS
  responsablesArray: Responsables[] = []
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


  constructor(private panelService: PanelCarteraService) {
    this.panelService.sidebarState$.subscribe(state => {
      this.btn = state
    })
  }

  ngOnInit(): void {
    this.getCuentas()
    this.responsablesArray = [
      {
        tipoGarante: 'TITULAR',
        nombre: 'Yeimar Fernando Sánchez'
      },
      {
        tipoGarante: 'CODEUDOR',
        nombre: 'Duván Diaz'
      }
    ]

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

    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  getCuentas() {
    this.panelService.cuentasByCampaña('FILTRADO').pipe(
      tap((data: any) => {
        console.log(data);
      }), catchError((error) => {
        console.error(error);
        return of([])
      })
    ).subscribe()
  }

  infoPersonalAccordion() {
    if (this.infoPersonal == false) {
      this.infoPersonal = true
    } else {
      this.infoPersonal = false
    }
  }

  saldosAccordion() {
    if (this.saldos == false) {
      this.saldos = true
    } else {
      this.saldos = false
    }
  }

  findTipoGarante(event: any) {
    var type = this.responsablesArray.find((t: any) => t.nombre == event.target.value)
    if (type != null && type != undefined) {
      this.tipoGarante = type.tipoGarante
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
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

    this.panelService.setButtonState(true)

    console.log(this.datosConfirmados);
    this.actionDato = ''
    this.actionIcon = ''
  }

}
