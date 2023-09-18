import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Plataforma } from 'src/app/Types/Banco';
import { Consignacion, Obligacion } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  constructor(private ingresarService:IngresarService, private authService:AuthenticationService , private bancoService:BancoServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPlataforma()
  }

  cedula:string = ''

  tabla:boolean = false

  consignacion:Consignacion = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    idPlataforma: 0,
    observaciones: '',
    obligaciones: [],
    base64: '',
    username: ''
  }

  obligacion:Obligacion[] = []

  plataforma:any[] = []

  guardarConsignacion(){
    const recibo = this.consignacion.numeroRecibo.trim()
    if(this.consignacion.numeroRecibo.trim() == '' || isNaN(parseInt(recibo))){
      Swal.fire('Error', 'Debe de Ingresar el Número del Recibo', 'error')
      return
    }
    if(this.consignacion.valor == 0 || this.consignacion.valor == null){
      Swal.fire('Error', 'Debe de Ingresar el Valor de la Consignación', 'error')
      return
    }
    if(this.consignacion.fechaPago instanceof Date || this.consignacion.fechaPago == null){
      Swal.fire('Error', 'Debe de Ingresar la fecha de Pago', 'error')
      return
    }
    if(this.consignacion.obligaciones.length <= 0){
      Swal.fire('Error', 'Debe de Seleccionar al menos una Obligación', 'error')
      return
    }
    if(this.consignacion.idPlataforma == 0 || this.consignacion.idPlataforma == null){
      Swal.fire('Error', 'Debe de Seleccionar una Plataforma de Pago', 'error')
      return
    }
    if(this.consignacion.base64.trim() == '' || this.consignacion.base64 == null){
      Swal.fire('Error', 'Debe de Seleccionar Un Archivo', 'error')
      return
    }
    
    var user = this.authService.getUsername()

    if(user == null || user == undefined){
      return
    }
     this.consignacion.username = user

     this.showModal()
  }

  guardarConObs(dato:string){

    if(dato == 'SI'){
      if(this.consignacion.observaciones.trim() == '' || this.consignacion.observaciones.trim() == null){
        Swal.fire('Error', 'Si quieres guardar una consignación debes de llenar el campo', 'error')
        return
      }

      this.ingresarService.saveConsignacion(this.consignacion).subscribe(
        (data:any) => {
          Swal.fire('Felicidades', 'Su Consignación se ha Guardado con Éxito', 'success')
          this.consignacion = {
            idConsignacion: 0,
            numeroRecibo: '',
            valor: 0,
            fechaPago: new Date,
            idPlataforma: 0,
            observaciones: '',
            obligaciones: [],
            base64: '',
            username: ''
          }
          
        }, (error:any) => {
          Swal.fire('Error', 'Error al Guardar La Consignación', 'error')
          console.log(error);
        }
      )
    } else {
      this.ingresarService.saveConsignacion(this.consignacion).subscribe(
        (data:any) => {
          Swal.fire('Felicidades', 'Su Consignación se ha Guardado con Éxito', 'success')
          this.consignacion = {
            idConsignacion: 0,
            numeroRecibo: '',
            valor: 0,
            fechaPago: new Date,
            idPlataforma: 0,
            observaciones: '',
            obligaciones: [],
            base64: '',
            username: ''
          }
        }, (error:any) => {
          Swal.fire('Error', 'Error al Guardar La Consignación', 'error')
          console.log(error);
        }
      )
    }
    
  }

  showModal() {
    $('#myModal').modal('show');
  }

  getObligacionByCedula(){

    const cedula = this.cedula.trim()
    if(this.cedula.trim() == '' || isNaN(parseInt(cedula))){
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }

    this.ingresarService.getObligacionByCedula(this.cedula).subscribe(
      (data:any) => {
        this.obligacion = data
        if(this.obligacion.length > 0){
          this.tabla = true
          return
        }
        if(this.obligacion.length <= 0){
          Swal.fire('Error', 'Digite Una Cédula Válida', 'error')
          this.cedula = ''
          return
        }
        
      }, (error:any) => {
        Swal.fire('Error', 'Error Al Traer Las Obligaciones', 'error')
        this.cedula = ''
        console.log(error);
      }
    )
  }

  public obtenerFile(event: any) {
    var archivo = event.target.files[0];
    this.extraerBase64(archivo).then((file: any) => {
      this.consignacion.base64 = file.base;
      console.log(this.consignacion);
    })
  }

  public extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  check(obligacion:string){
    if(this.consignacion.obligaciones.includes(obligacion)){
      var position = this.consignacion.obligaciones.indexOf(obligacion)
      this.consignacion.obligaciones.splice(position, 1)
    } else {
      this.consignacion.obligaciones.push(obligacion)
    }
    
  }

  getPlataforma(){
    this.bancoService.getBancos().subscribe(
      (data:any) => {
        this.plataforma = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }




}
