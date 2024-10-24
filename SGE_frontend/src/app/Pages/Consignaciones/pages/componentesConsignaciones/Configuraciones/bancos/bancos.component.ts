import { Component, OnInit } from '@angular/core';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { Banco, Plataforma } from 'src/app/Types/Banco';
import { tipoPago } from 'src/app/Types/TipoPago';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {

  datosT:tipoPago = {
    tipoPago: '',
    idTipoPago: 0
  }

  datosTipoP:tipoPago[] = []

  datosP:Plataforma = {
    idPlataforma: 0,
    bancoDto: {
      idBanco: 0,
      nombreBanco: '',
      idTipoPago: 0
    }
  }

  modal:any = {
    idPlataforma: 0,
    bancoDto: {
      idBanco: 0,
      nombreBanco: "",
      idTipoPago: 0
    }
  }

  datosPlatform:any[] = []

  spinner:boolean = true
  crearTipoPago:boolean = false
  crearBanco:boolean = false
  deletePlatform:boolean = false

  page:number = 1

  constructor(private bancoService:BancoServiceService) { }

  ngOnInit(): void {
    this.getTipoPago()
    this.getAllBanco()
  }

  validateTipoPago(){
    if(this.datosT.tipoPago == '' || this.datosT.tipoPago == null){
      Swal.fire('Error', 'Digite el tipo de Pago', 'error')
      return
    }

    this.crearTipoPago = true
    setTimeout(() => {
      this.saveTipoPago()      
    }, 3000);
  }

  saveTipoPago(){
    this.bancoService.save(this.datosT).subscribe(
      (data:any) => {
        Swal.fire('Datos Guardados', 'Tipo de Pago Guardado Exitosamente', 'success'),
        this.crearTipoPago = false
        this.datosT = {
          tipoPago: '',
          idTipoPago: 0
        }
      }, (error:any) => {
        
        Swal.fire('Error', 'Error al Crear el tipo de Pago', 'error')
        this.crearTipoPago = false
        this.datosT = {
          tipoPago: '',
          idTipoPago: 0
        }
      }
    )
  }

  getTipoPago(){
    this.bancoService.getTipoPago().subscribe(
      (data:any) => {
        this.datosTipoP = data
        
      }, (error:any) => {
        Swal.fire('Error', 'Error al Cargar los tipo de Pago', 'error')
      }
    )
  }

  validateBanco(){
    if(this.datosP.bancoDto.nombreBanco == '' || this.datosP.bancoDto.nombreBanco == null){
      Swal.fire('Error', 'Digite el Nombre Del Banco', 'error')
      return
    }
    if(this.datosP.bancoDto.idTipoPago == 0 || this.datosP.bancoDto.idTipoPago == null){
      Swal.fire('Error', 'Seleccione el Tipo De Pago', 'error')
      return
    }
    this.crearBanco = true
    setTimeout(() => {
      this.saveBanco()      
    }, 3000);
  }

  saveBanco(){
    this.bancoService.saveBanco(this.datosP).subscribe(
      (data:any) => {
        Swal.fire('Datos Guardados', 'El Banco ha sido Creado Exitosamente', 'success')
        this.crearBanco = false
        this.datosP = {
          idPlataforma: 0,
          bancoDto: {
            idBanco: 0,
            nombreBanco: '',
            idTipoPago: 0
          }
        }
        setTimeout(() => {
        window.location.reload()
        }, 2000);
      }, (error:any) => {
        Swal.fire('Error', 'Error Al Guardar El Banco', 'error')
        this.crearBanco = false
        this.datosP = {
          idPlataforma: 0,
          bancoDto: {
            idBanco: 0,
            nombreBanco: '',
            idTipoPago: 0
          }
        }
      }
    )
  }

  getAllBanco(){
    this.bancoService.getBancos().subscribe(
      (data:any) => {
        this.datosPlatform = data
        this.spinner = false
      }, (error:any) => {
        
      }
    )
  }

  getBancoById(id:number){
    this.bancoService.getBancosById(id).subscribe(
      (data:any) => {
        this.modal.idPlataforma = data.idPlataforma
        this.modal.bancoDto.nombreBanco = data.bancos.nombreBanco
        this.modal.bancoDto.idBanco = data.bancos.idBancos
        this.modal.bancoDto.idTipoPago = data.bancos.tipoPago[0].idTipoPago
        
      }, (error:any) => {
        
      }
    )
  }

  updateBanco(){

    if(this.modal.bancoDto.idTipoPago == 0 || this.modal.bancoDto.idTipoPago == null){
      Swal.fire('Error', 'Seleccione el Tipo de Pago', 'error')
      return
    }
    if(this.modal.bancoDto.nombreBanco == '' || this.modal.bancoDto.nombreBanco == null){
      Swal.fire('Error', 'Digite el Nombre del Banco', 'error')
      return
    }
    
    this.validateBancoUpdate()
    
  }

  validateBancoUpdate(){    
    this.bancoService.updateBancos(this.modal).subscribe(
      (data:any) => {
        Swal.fire('Datos Guardados', 'El Banco ha sido Actualizado Exitosamente', 'success')
        setTimeout(() => {
          window.location.reload()
          }, 2000);
      }, (error:any) => {
        Swal.fire('Error', 'Error Al Editar El Banco', 'error')
        
      }
    )
  }

  cambiarPago(event:any){
    var valor = event.target.value
    this.modal.bancoDto.idTipoPago = valor
  }

  deletePlataforma(idTipoPago:number){
    Swal.fire({
      title: 'Eliminar La Plataforma',
      text: '¿Estas seguro de Esta Plataforma?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          this.deletePlatform = true
          setTimeout(() => {
            this.bancoService.deletePlataforma(idTipoPago).subscribe(
              (data: any) => {
                this.datosPlatform = this.datosPlatform.filter((tipoPago:any) => tipoPago.id != idTipoPago);
                Swal.fire('Plataforma Eliminada', 'La Plataforma ha sido Eliminado Exitosamente', 'success')
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
                this.deletePlatform = false
              },
              (error:any) => {
                Swal.fire('Error', 'Error al Eliminar La Plataforma', 'error')
                console.log(error);
                this.deletePlatform = false
              }
            )
          }, 2000);
        }
    })  
  }
}
