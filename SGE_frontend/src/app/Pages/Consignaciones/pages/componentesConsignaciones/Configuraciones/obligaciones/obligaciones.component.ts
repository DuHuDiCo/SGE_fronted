import { Component, OnInit } from '@angular/core';
import { ObligacionesService } from 'src/app/Services/Consignaciones/Obligaciones/obligaciones.service';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { Sede } from 'src/app/Types/Sede';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-obligaciones',
  templateUrl: './obligaciones.component.html',
  styleUrls: ['./obligaciones.component.css']
})
export class ObligacionesComponent implements OnInit {

  obligacion:any = {
    idCuentasPorCobrar: null,
    cedula: null,
    numeroObligacion: null,
    totalCuotas: null,
    periodicidad: null,
    valorCuota: null,
    saldoInicial: null,
    diasVencidos: null,
    capital: null,
    saldoVencido: null,
    interesesTotales: null,
    interesesVencidos: null,
    otrosCobros: null,
    saldoMora: null,
    saldoTotal: null,
    observacion: '',
    id_venta: 1,
    tipoCuentaPorCobrar: '',
    estado: '',
    idAsesor: '',
    sede: ''
  }

  estados:any[] = []
  asesores:any[] = []
  tipos:any[] = []
  sedes:Sede[] = []

  botonSave:boolean = false

  constructor(private obligacionService:ObligacionesService, private sedeService:SedeService) { }

  ngOnInit(): void {
    this.getAllEstado()
    this.getAllAsesores()
    this.getAllTipoObligacion()
    this.getAllSede()
  }

  save(){
    if(this.obligacion.numeroObligacion == '' || this.obligacion.numeroObligacion == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Número de Obligación',
        timer: 3000
      })
      return
    }

    if(this.obligacion.totalCuotas == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El total de Cuotas',
        timer: 3000
      })
      return
    }

    if(this.obligacion.cedula == '' || this.obligacion.cedula == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite La Cédula Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.obligacion.sede == '' || this.obligacion.sede == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Sede',
        timer: 3000
      })
      return
    }

    if(this.obligacion.periodicidad == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite La Periodicidad',
        timer: 3000
      })
      return
    }

    if(this.obligacion.valorCuota == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Valor de la Cuota',
        timer: 3000
      })
      return
    }

    if(this.obligacion.saldoInicial == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El saldoInicial',
        timer: 3000
      })
      return
    }

    if(this.obligacion.diasVencidos == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los Dias Vencidos',
        timer: 3000
      })
      return
    }

    if(this.obligacion.saldoVencido == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Saldo Vencido',
        timer: 3000
      })
      return
    }

    if(this.obligacion.capital == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Capital',
        timer: 3000
      })
      return
    }

    if(this.obligacion.interesesTotales == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los intereses Totales',
        timer: 3000
      })
      return
    }

    if(this.obligacion.interesesVencidos == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los intereses Vencidos',
        timer: 3000
      })
      return
    }

    if(this.obligacion.otrosCobros == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite otros Cobros',
        timer: 3000
      })
      return
    }

    if(this.obligacion.saldoMora == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Saldo en Mora',
        timer: 3000
      })
      return
    }

    if(this.obligacion.saldoTotal == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Saldo Total',
        timer: 3000
      })
      return
    }

    if(this.obligacion.tipoCuentaPorCobrar == '' || this.obligacion.tipoCuentaPorCobrar == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Tipo De Obligación',
        timer: 3000
      })
      return
    }

    if(this.obligacion.estado == '' || this.obligacion.estado == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Estado De La Obligación',
        timer: 3000
      })
      return
    }

    if(this.obligacion.idAsesor == 0 || this.obligacion.idAsesor == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Asesor',
        timer: 3000
      })
      return
    }

    this.botonSave = true
    
    setTimeout(() => {
      this.obligacionService.saveObligacion(this.obligacion).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'La Observación Ha Sido Creada Con Éxito',
            timer: 3000
          })
          this.botonSave = false
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Erro Al Crear La Obligación',
            timer: 3000
          })
          this.botonSave = false
          console.log(error);
        }
      )
    }, 2000);
  }

  getAllEstado(){
    this.obligacionService.getAllEstado().subscribe(
      (data:any) => {
        this.estados = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getAllAsesores() {
    this.obligacionService.getAllAsesores().subscribe(
      (data: any) => {
        this.asesores = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getAllTipoObligacion(){
    this.obligacionService.getAllTipo().subscribe(
      (data:any) => {
        this.tipos = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getAllSede(){
    this.sedeService.getSedes().subscribe(
      (data:any) => {
        this.sedes = data
      }, (error:any) => {
        console.log(error);
        
      }
    )
  }

}
