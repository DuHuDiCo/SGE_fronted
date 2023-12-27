import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { ObligacionesService } from 'src/app/Services/Consignaciones/Obligaciones/obligaciones.service';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Plataforma } from 'src/app/Types/Banco';
import { Con, ConRes, Consignacion, Obligacion } from 'src/app/Types/Consignaciones';
import { Sede } from 'src/app/Types/Sede';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  constructor(private ingresarService: IngresarService,private obligacionService:ObligacionesService, private authService: AuthenticationService, private bancoService: BancoServiceService, private sanitizer: DomSanitizer, private sedeService:SedeService) { }

  ngOnInit(): void {
    this.getPlataforma()
    this.getAllSede()
    this.getAllAsesores()
  }

  cedula: string = ''
  mensaje:string = ''

  tabla: boolean = false
  crearConsignacion: boolean = false
  crearCliente: boolean = false
  con: ConRes = {
    mensaje: '',
    consigRes: []
  }

  consignacion: Consignacion = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: null,
    fechaPago: new Date,
    idPlataforma: 0,
    observaciones: '',
    obligaciones: [],
    base64: '',
    username: ''
  }

  cliente: any = {
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    numeroDocumento: '',
    username: '',
    numeroObligacion: '',
    sede: '',
    asesor: ''
  }

  obligacion: Obligacion[] = []
  sedes:Sede[] = []
  asesores:any[] = []

  plataforma: any[] = []

  guardarConsignacion() {
    const recibo = this.consignacion.numeroRecibo.replace(/\s+/g, '')
    if (recibo.trim() == '' || isNaN(parseInt(recibo))) {
      Swal.fire('Error', 'Debe de Ingresar el Número del Recibo', 'error')
      return
    }
    if (this.consignacion.valor == 0 || this.consignacion.valor == null) {
      Swal.fire('Error', 'Debe de Ingresar el Valor de la Consignación', 'error')
      return
    }
    if (this.consignacion.fechaPago instanceof Date || this.consignacion.fechaPago == null) {
      Swal.fire('Error', 'Debe de Ingresar la fecha de Pago', 'error')
      return
    }
    if (this.consignacion.obligaciones.length <= 0) {
      Swal.fire('Error', 'Debe de Seleccionar al menos una Obligación', 'error')
      return
    }
    if (this.consignacion.idPlataforma == 0 || this.consignacion.idPlataforma == null) {
      Swal.fire('Error', 'Debe de Seleccionar una Plataforma de Pago', 'error')
      return
    }
    if (this.consignacion.base64.trim() == '' || this.consignacion.base64 == null) {
      Swal.fire('Error', 'Debe de Seleccionar Un Archivo', 'error')
      return
    }

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.consignacion.username = user

    this.showModal()

  }

  guardarConObs(dato: string) {
    if (dato == 'SI') {
      if (this.consignacion.observaciones?.trim() == '' || this.consignacion.observaciones?.trim() == null) {
        Swal.fire('Error', 'Si quieres guardar una consignación debes de llenar el campo', 'error')
        return
      }

      this.ingresarService.confirmarConsignacion(this.consignacion.numeroRecibo, this.consignacion.fechaPago, this.consignacion.valor, this.consignacion.username).subscribe(
        (data: any) => {
          this.con = data
          if (this.con.consigRes.length <= 0) {
            this.ingresarService.saveConsignacion(this.consignacion).subscribe(
              (data: any) => {
                Swal.fire('Datos Guardados', 'Su Consignación se ha Guardado con Éxito', 'success')
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
                setTimeout(() => {
                  window.location.reload()
                }, 2000);

      

              }, (error: any) => {
                Swal.fire('Error', 'Error al Guardar La Consignación', 'error')
              }
            )
          }

          if (this.con.consigRes.length > 0) {
            if (this.con.mensaje == 'RECIBO VALOR Y FECHA DE PAGO') {
            }
            if (this.con.mensaje == 'RECIBO Y FECHA') {
            }
            if (this.con.mensaje == 'RECIBO VALOR') {
            }
            if (this.con.mensaje == 'RECIBO') {
            }
            this.showModalCon()
          }
        }, (error: any) => {
          console.log(error);
        }
      )


    } else {
      this.consignacion.observaciones = null
      
      this.ingresarService.confirmarConsignacion(this.consignacion.numeroRecibo, this.consignacion.fechaPago, this.consignacion.valor, this.consignacion.username).subscribe(
        (data: any) => {
          this.con = data
          console.log(data);
          if (this.con.consigRes.length <= 0) {
            console.log(this.consignacion.fechaPago);
            
            this.ingresarService.saveConsignacion(this.consignacion).subscribe(
              (data: any) => {
                Swal.fire('Datos Guardados', 'Su Consignación se ha Guardado con Éxito', 'success')
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
                setTimeout(() => {
                  window.location.reload()
                }, 2000);

              }, (error: any) => {
                Swal.fire('Error', 'Error al Guardar La Consignación', 'error')
              }
            )
          }
          if (this.con.consigRes.length > 0) {
            if (this.con.mensaje == 'RECIBO VALOR Y FECHA DE PAGO') {
            }
            if (this.con.mensaje == 'RECIBO Y FECHA') {
            }
            if (this.con.mensaje == 'RECIBO VALOR') {
            }
            if (this.con.mensaje == 'RECIBO') {
            }
            this.showModalCon()
          }
          
        }, (error: any) => {
          Swal.fire('Error', 'Error al Guardar La Consignación', 'error')

        }
      )
    }



  }

  confirmarObservacion(){
    this.crearConsignacion = true
    this.ingresarService.saveConsignacion(this.consignacion).subscribe(
      (data: any) => {
        this.crearConsignacion = false
        Swal.fire('Datos Guardados', 'Su Consignación se ha Guardado con Éxito', 'success')
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
        setTimeout(() => {
          window.location.reload()
        }, 2000);

      }, (error: any) => {
        Swal.fire('Error', 'Error al Guardar La Consignación', 'error')
        this.crearConsignacion = false
      }
    )
  }

  guardarCliente(){
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.cliente.username = user

    if(this.cliente.nombres.trim() == '' || this.cliente.nombres.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los Nombres Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.cliente.apellidos.trim() == '' || this.cliente.apellidos.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los apellidos Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.cliente.tipoDocumento.trim() == '' || this.cliente.tipoDocumento.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Tipo De Documento Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.cliente.numeroDocumento.trim() == '' || this.cliente.numeroDocumento.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Número De Documento Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.cliente.numeroObligacion.trim() == '' || this.cliente.numeroObligacion.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Número De Obligación Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.cliente.sede.trim() == '' || this.cliente.sede.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija La Sede Del Cliente',
        timer: 3000
      })
      return
    }

    if(this.cliente.asesor == 0 || this.cliente.asesor == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Asesor Del Cliente',
        timer: 3000
      })
      return
    }
    
    this.crearCliente = true

    console.log(this.cliente);
    

    this.ingresarService.saveCliente(this.cliente).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Cliente Creado Exitosamente',
          timer: 3000
        })
        $('#modalCliente').modal('hide');
        this.crearCliente = false

        this.cedula = this.cliente.numeroDocumento

        this.ingresarService.getObligacionByCedula(this.cedula).subscribe(
          (data:any) => {
            this.obligacion = data
            if (this.obligacion.length > 0) {
              this.tabla = true
              return
            }
          }, (error:any) => {
            console.log(error);
          }
        )
      }, (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Erro Al Crear El Cliente',
          timer: 3000
        })
        this.crearCliente = false
        this.cliente = {
          nombres: '',
          apellidos: '',
          tipoDocumento: '',
          numeroDocumento: '',
          username: '',
          numeroObligacion: '',
          sede: '',
          asesor: 0
        }
        console.log(error);
        
      }
    )

  }

  getAllSede(){
    this.sedeService.getSedes().subscribe(
      (data:any) => {
        this.sedes = data
        console.log(data);
      }, (error:any) => {
        console.log(error);
        
      }
    )
  }

  getAllAsesores() {
    this.obligacionService.getAllAsesores().subscribe(
      (data: any) => {
        this.asesores = data
        console.log(this.asesores);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  showModal() {
    $('#myModal').modal('show');
  }

  showModalCon(){
    $('#modalConfirmar').modal('show');
  }

  showCliente(){
    $('#modalCliente').modal('show')
  }

  getObligacionByCedula() {

    const cedula = this.cedula.trim()
    if (this.cedula.trim() == '' || isNaN(parseInt(cedula))) {
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }

    this.ingresarService.getObligacionByCedula(this.cedula).subscribe(
      (data: any) => {
        this.obligacion = data
        console.log(data);
        if (this.obligacion.length > 0) {
          this.tabla = true
          return
        }
        if (this.obligacion.length <= 0) {
          Swal.fire('Error', 'La Cédula No Pertenece A un Cliente', 'error')
          this.showCliente()
          this.tabla = false
          this.cedula = ''
          return
        }
      }, (error: any) => {
        Swal.fire('Error', 'Error Al Traer Las Obligaciones', 'error')
        this.cedula = ''

      }
    )
  }

  public obtenerFile(event: any) {
    var archivo = event.target.files[0];

    if (archivo.size > 1048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.consignacion.base64 = ''
      return
    }

    this.extraerBase64(archivo).then((file: any) => {
      this.consignacion.base64 = file.base;

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

  check(obligacion: string) {
    if (this.consignacion.obligaciones.includes(obligacion)) {
      var position = this.consignacion.obligaciones.indexOf(obligacion)
      this.consignacion.obligaciones.splice(position, 1)
    } else {
      this.consignacion.obligaciones.push(obligacion)
    }

  }

  getPlataforma() {
    this.bancoService.getBancos().subscribe(
      (data: any) => {
        this.plataforma = data
      }, (error: any) => {

      }
    )
  }

  cancelarConsignacion(){
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

    this.cedula = ''
    this.tabla = false
  }

  cancelarCliente(){
    this.cliente = {
      nombres: '',
      apellidos: '',
      tipoDocumento: '',
      numeroDocumento: '',
      username: '',
      numeroObligacion: '',
      sede: '',
      asesor: 0
    }
  }




}
