import { Component, OnInit } from '@angular/core';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { ConsultarService } from 'src/app/Services/Consignaciones/Consultar/consultar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Plataforma } from 'src/app/Types/Banco';
import { Con, Consignacion } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  roles:string[] = []
  plataforma:any[] = []

  con:Con[] = []
  modal:Consignacion = {
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

  actu:Con = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    fechaCreacion: new Date,
    isSelected: true,
    usuarioId: 0,
    comprobantes: {
      idComprobante: 0,
      nombreArchivo: '',
      rutaArchivo: '',
      fechaCreacion: new Date,
      usuarioId: 0,
      dataURI: ''
    },
    plataforma: {
      idPlataforma: 0,
      bancos: {
        idBancos: 0,
        nombreBanco: '',
        tipoPago: []
      }
    },
    observaciones: [],
    obligaciones: [],
    actualizaciones: [],
    fileReportes: []
  }

  cedula:string = ''

  base64:string = ''

  constructor(private authService:AuthenticationService, private consultarService:ConsultarService, private bancoService:BancoServiceService) { }

  ngOnInit(): void {
    this.getRoles()
    this.getPlataforma()
  }

  validateNewConsignacion(){
    if(this.modal.numeroRecibo.trim() == '' || this.modal.numeroRecibo.trim() == null){
      Swal.fire('Error', 'Digite un Número de Recibo', 'error')
      return
    }
    if(this.modal.valor == 0 || this.modal.valor == null){
      Swal.fire('Error', 'Digite un Valor', 'error')
      return
    }
    if(this.modal.fechaPago instanceof Date || this.modal.fechaPago == null){
      Swal.fire('Error', 'Seleccione Una Fecha de Pago', 'error')
      return
    }
    if(this.modal.obligaciones.length <= 0 || this.modal.obligaciones == null){
      Swal.fire('Error', 'Debe de Tener al Menos Una Obligación Seleccionada', 'error')
      return
    }
    if(this.modal.idPlataforma == 0 || this.modal.idPlataforma == null){
      Swal.fire('Error', 'Seleccione Una Plataforma', 'error')
      return
    }
  }

  getRoles(){
    this.roles = this.authService.getRoles()
    console.log(this.roles);
    var permiso:any  = {}
    this.roles.forEach((element:any) => {
      permiso = element.permisos.find((p:any) => p.permiso.startsWith('CONSULTAR'))
      console.log(permiso);
    });
    var arrayP = permiso.permiso.split(" ")
    var p = arrayP[1].substring(0, arrayP[1].length -1)
    console.log(p);

    this.getConsignaciones(p)
  }

  getConsignaciones(p:string){
    this.consultarService.getAllConsignaciones(p).subscribe(
      (data:any) => {
        this.con = data
        console.log(data);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  img(dataURI:string){
    this.base64 = dataURI
  }

  getConsignacionById(id:number){
    this.consultarService.getConsignacionById(id).subscribe(
      (data:any) => {
        this.modal.idConsignacion = id
        this.modal.numeroRecibo = data.numeroRecibo
        this.modal.valor = data.valor
        this.modal.fechaPago = data.fechaPago
        this.modal.obligaciones = data.obligaciones
        this.modal.idPlataforma  = data.plataforma.idPlataforma
        this.modal.base64  = data.base64

        this.actu = data
        console.log(data);
      }, (error:any) => {
        console.log(error);
      }
    )
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

  cambiarPago(event:any){
    var valor = event.target.value
    this.modal.idPlataforma = valor
  }



}
