import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { Gestion } from 'src/app/Types/Cartera/Gestion/Gestion';

@Component({
  selector: 'app-modal-acuerdo',
  templateUrl: './modal-acuerdo.component.html',
  styleUrls: ['./modal-acuerdo.component.css']
})
export class ModalAcuerdoComponent implements OnInit {

  // OBJECTS
  newGestion: Gestion = {
    numeroObligacion: '',
    clasificacion: {
      tipoClasificacion: null,
      tarea: null,
      nota: null,
      acuerdoPago: null,
      nombreClasificacion: "Seleccionar Una Clasificacion"
    },
    contact: false,
    detallesAdicionales: '',
    usernameToSetNotificacion: '',
    userNotifying: '',
    notificacionId: null,
    clasificacionId: null
  }

  // ARRAYS
  ClasificacionArray: clasificacion[] = []

  // VARIABLES

  // FECHAS ACUERDO
  fechaActual: Date = new Date();
  fechamax: string = '';
  fechamin: string = '';
  fechaCorte: string = '';

  // HIDDEN COL
  col: boolean = true;
  disabledFecha: boolean = false;

  constructor(private cuentasCobrar: CuentasCobrarService) { }

  ngOnInit(): void {
    this.getClasificacion()
    this.fechaActual = new Date()
    this.fechaCorte = this.getCurrentDate()
  }

  // CLASIFICACION
  getClasificacion() {
    this.cuentasCobrar.getClasificacion().subscribe(
      (data: any) => {
        this.ClasificacionArray = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  // MAX FECHA ACUERDO
  maxFecha(): string {
    var fechaMax = new Date();

    fechaMax.setDate(this.fechaActual.getDate() + 30)
    var fechaForm = fechaMax.toISOString().split('T')[0]
    this.fechamax = fechaForm
    return fechaForm;
  }

  // MIN FECHA ACUERDO
  minFecha(): string {
    var fechaMin = new Date();
    var fechaForm = fechaMin.toISOString().split('T')[0]
    this.fechamin = fechaForm

    return fechaForm;
  }

  // FECHA CORTE
  getCurrentDate(): string {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();

    const fechaFormateada = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return fechaFormateada;
  }


  calculateAcuerdo() {
    this.col = false
    this.disabledFecha = true
  }

}
