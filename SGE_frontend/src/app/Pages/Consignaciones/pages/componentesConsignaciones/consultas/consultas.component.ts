import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { ConsultarService } from 'src/app/Services/Consignaciones/Consultar/consultar.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Plataforma } from 'src/app/Types/Banco';
import { Con, Consignacion, Obligacion } from 'src/app/Types/Consignaciones';
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
    cuentasCobrar: [],
    actualizaciones: [],
    fileReportes: []
  }

  cuentasPorCobrar:Con = {
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
    cuentasCobrar: [],
    actualizaciones: [],
    fileReportes: []
  }

  detalle:Con = {
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
    cuentasCobrar: [],
    actualizaciones: [],
    fileReportes: []
  }

  cedula:string = ''

  base64:string = ''

  check:boolean = false

  constructor(private authService:AuthenticationService, private consultarService:ConsultarService, private bancoService:BancoServiceService, private ingresarService:IngresarService,  private sanitizer: DomSanitizer) { }

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
      if(this.cuentasPorCobrar.cuentasCobrar.length <= 0 || this.cuentasPorCobrar.cuentasCobrar == null){
        Swal.fire('Error', 'Debe de Tener al Menos Una Obligación Seleccionada', 'error')
        return
      }
    }
    if(this.modal.idPlataforma == 0 || this.modal.idPlataforma == null){
      Swal.fire('Error', 'Seleccione Una Plataforma', 'error')
      return
    }
    console.log(this.modal);

    var user = this.authService.getUsername()

    if(user == null || user == undefined){
      return
    }
     this.modal.username = user

    this.consultarService.updateConsignacion(this.modal).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'Consignación Actualizada Con éxito', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }, (error:any) => {
        Swal.fire('Error', 'Error al Actualizar La Consignación', 'error')
        console.log(error);
      }
    )
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
        this.con = data.content
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
        this.cuentasPorCobrar.cuentasCobrar = []

        this.modal.idConsignacion = id
        this.modal.numeroRecibo = data.numeroRecibo
        this.modal.valor = data.valor
        this.modal.fechaPago = data.fechaPago
        this.modal.idPlataforma  = data.plataforma.idPlataforma
        this.modal.base64  = data.base64

        this.actu = data
        this.cuentasPorCobrar = data
        this.detalle = data
        console.log(data);
        console.log(this.modal);
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

  getObligacionByCedula(){
    const cedula = this.cedula.trim()
    if(this.cedula.trim() == '' || isNaN(parseInt(cedula))){
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }
    this.ingresarService.getObligacionByCedula(this.cedula).subscribe(
      (data:any) => {
        this.cuentasPorCobrar.cuentasCobrar = data

        if(this.cuentasPorCobrar.cuentasCobrar.length > 0){
          this.check = true
          return
        }

        if(this.cuentasPorCobrar.cuentasCobrar.length <= 0){
          Swal.fire('Error', 'Digite Una Cédula Válida', 'error')
          this.cedula = ''
          return
        }
        
      }, (error:any) => {
        Swal.fire('Error', 'Error Al Traer Las Obligaciones', 'error')
        this.check = false
        this.cedula = ''
        console.log(error);
      }
    )
  }

  checkBox(obligacion:string){
    this.modal.obligaciones = []
    if(this.modal.obligaciones.includes(obligacion)){
      var position = this.modal.obligaciones.indexOf(obligacion)
      this.modal.obligaciones.splice(position, 1)
    } else {
      this.modal.obligaciones.push(obligacion)
    }
    
  }

  public obtenerFile(event: any) {
    var archivo = event.target.files[0];
    this.extraerBase64(archivo).then((file: any) => {
      this.modal.base64 = file.base;
      console.log(this.modal);
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
}
