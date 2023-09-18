import { Component, OnInit } from '@angular/core';
import { BancoServiceService } from 'src/app/Services/Consignaciones/banco-service.service';
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

    this.saveTipoPago()
  }

  saveTipoPago(){
    this.bancoService.save(this.datosT).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'Tipo de Pago Guardado Exitosamente', 'success'),
        this.datosT = {
          tipoPago: '',
          idTipoPago: 0
        }
      }, (error:any) => {
        console.log(error);
        Swal.fire('Error', 'Error al Crear el tipo de Pago', 'error')
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
        console.log(this.datosTipoP);
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
    this.saveBanco()
  }

  saveBanco(){
    this.bancoService.saveBanco(this.datosP).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'El Banco ha sido Creado Exitosamente', 'success')
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
        console.log(data);
        
      }, (error:any) => {
        console.log(error);
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
        console.log(data);
      }, (error:any) => {
        console.log(error);
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
        Swal.fire('Felicidades', 'El Banco ha sido Actualizado Exitosamente', 'success')
      }, (error:any) => {
        Swal.fire('Error', 'Error Al Editar El Banco', 'error')
        console.log(error);
      }
    )
  }

  cambiarPago(event:any){
    var valor = event.target.value
    this.modal.bancoDto.idTipoPago = valor
  }



}
