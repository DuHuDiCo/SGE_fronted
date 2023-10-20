import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { ReportesService } from 'src/app/Services/Consignaciones/Reportes/reportes.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Reportes } from 'src/app/Types/Consignaciones';
import { ROLES } from 'src/app/Types/Roles';
import { users } from 'src/app/Types/Usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private reportesService: ReportesService, private authService: AuthenticationService, private usuariosService:BuscarUsuariosService) { }

  page: number = 0
  size: number = 10
  order: string = 'idReporte'
  tipoReporte: string = 'null'
  fecha: string = 'null'
  username: string = 'null'

  botonFiltrar:boolean = false
  last: boolean = false
  first: boolean = false
  cont: number = 1
  isCon: boolean = false
  initialCon: number = 1;

  reportes: Reportes[] = []
  usuarios: users[] = []
  paginas!: Array<number>

  private proSubscription!: Subscription;

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  ngOnInit(): void {
    this.getFirts()
    this.listarUsuarios()
  }

  @ViewChild('pdfEmbed') pdfEmbed!: ElementRef;

  getFirts(){
    if (this.validarRol()) {
      this.reportesService.getAll(this.page, this.size, this.order).subscribe(
        (data:any) => {
          this.reportes = data.content
          this.paginas = new Array(data.totalPages)
          this.last = data.last
          this.first = data.first
          this.reportesService.proSubject.next(true);
          console.log(this.reportes);
        }, (error:any) => {
          console.log(error);
        }
      )
    } else {
      var user = this.authService.getUsername()
      if (user == null || user == undefined) {
        return
      }
      this.reportesService.getFilesByUsername(this.page, this.size, this.order, user).subscribe(
        (data:any) => {
          this.reportes = data.content
          console.log(this.reportes);
          
        }, (error:any) => {
          console.log(error);
        }
      )
    }
  }

  listarUsuarios(){
    this.usuariosService.listarUsuarios().subscribe(
      (data:any) => {
        this.usuarios = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  filter() {
    this.username?.trim()
    if (this.username == 'null' && this.fecha == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de Elegir Al Menos Un Filtro',
        timer: 3000
      })
      return
    }
    this.tipoReporte = 'null'
      this.reportesService.filtro(this.page, this.size, this.order, this.tipoReporte, this.username, this.fecha).subscribe(
        (data: any) => {
          this.reportes = data.content
          this.paginas = new Array(data.totalPages)
          this.last = data.last
          this.first = data.first
          this.reportesService.proSubject.next(true);
          console.log(this.reportes);
        }, (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al Filtrar',
            timer: 3000
          })
          console.log(error);
        }
      )



  }

  mostrarPDF(base64:string) {
    // Obtén el embed y el botón
      const embed = this.pdfEmbed.nativeElement;
      embed.src = base64;
  }

  validarRol() {
    var roles = this.authService.getRoles()
    if(roles != null){
      var rol = roles.find((r:any) => r.rol == ROLES.SuperAdministration || r.rol == ROLES.Administration)
      if(rol != null){
        return rol
      }
      return null
    }

  }

  change(event: any) {
    if(this.fecha == ''){
      this.fecha = 'null'
    }

    if (this.fecha != 'null' || this.username != 'null') {
      alert('abrir')
      this.botonFiltrar = true
    }
    
    if(this.fecha == 'null' && this.username == 'null'){
      alert('cerrar')
      this.botonFiltrar = false
    }
  }

  next() {
    if (!this.last) {
      this.page++
      this.getFirts()
      this.proSubscription = this.reportesService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.size);
        }
      );
      setTimeout(() => {
        this.proSubscription.unsubscribe()
      }, 1000);
    }
  }

  back() {
    if (!this.first) {
      this.page--
      this.getFirts()
      this.proSubscription = this.reportesService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.size);
        }
      );
      setTimeout(() => {
        this.proSubscription.unsubscribe()
      }, 1000);
    }
  }

  goToPage(page: number) {
    this.page = page
    this.getFirts()
  }

  

}