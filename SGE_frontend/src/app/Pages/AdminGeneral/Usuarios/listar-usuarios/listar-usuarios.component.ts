import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Datos } from 'src/app/Types/DatosUsuarios';
import { users } from 'src/app/Types/Usuarios';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})



export class BuscarUsuariosComponent implements OnInit {

  cont: number = 1
  isCon: boolean = false
  initialCon: number = 1;

  last: boolean = false
  first: boolean = false

  page: number = 0
  size: number = 20

  paginas!: Array<number>

  private proSubscription!: Subscription;

  ngOnInit(): void {
    this.listarUsuarios();
  }

  usuarios: users[] = []

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  nombre: string = ''

  datos: Datos = {
    username: '',
    passwordUser: '',
    datoToDelete: ''
  }

  constructor(private usuariosService: BuscarUsuariosService, private authService: AuthenticationService, private router: Router) { }

  private listarUsuarios() {
    this.usuariosService.listarUsuarios(this.page, this.size).subscribe(
      (data: any) => {
        this.usuarios = data.content;
        console.log(data);
        
        this.paginas = new Array(data.totalPages)
          this.last = data.last
          this.first = data.first
          this.usuariosService.proSubject.next(true);
      },
      (error: any) => {

        Swal.fire('ERROR', 'Error al cargar los usuarios', 'error');
      }
    );
  }

  public filtrarUsuarios() {
    this.usuarios = [];
    if (this.nombre) {
      this.usuariosService.filtrarUsuarios(this.nombre).subscribe(
        (data: any) => {
          this.usuarios = data
        },
        (error: any) => {

          Swal.fire('ERROR', 'Error al filtrar los Usuarios', 'error');
        }
      );
    } else {
      this.listarUsuarios();
    }
  }

  public desactivarUsuario() {

    let username = this.authService.getUsername();

    if (username === null) {
      Swal.fire('ERROR', 'Error al Desactivar el Usuario', 'error');
      return;
    }

    this.datos.username = username;


    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire('ERROR', 'Debe colocar la Contraseña', 'error');
      return;
    }

    Swal.fire({
      title: 'Desactivar El Cliente',
      text: '¿Estás seguro de Desactivar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.desactivarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire('Usuario Desactivado', 'El Usuario ha sido Desactivado Exitosamente', 'success');
            this.datos = {
              username: "",
              passwordUser: "",
              datoToDelete: ""
            };
            window.location.reload()
          },
          (error: any) => {

            Swal.fire('ERROR', 'Error al Desactivar el Usuario', 'error');
          }
        );
      }
    });
  }

  public activarUsuario() {

    let username = this.authService.getUsername()

    if (username === null) {
      Swal.fire('ERROR', 'Error al Desactivar el Usuario', 'error');
      return;
    }

    this.datos.username = username

    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire('ERROR', 'Debe colocar la Contraseña', 'error')
      return
    }

    Swal.fire({
      title: 'Activar El Cliente',
      text: '¿Estas seguro de Activar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.activarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire('Usuario Activado', 'El Usuario ha sido Activado Exitosamente', 'success');
            this.datos = {
              username: "",
              passwordUser: "",
              datoToDelete: ""
            };
            window.location.reload()
          },
          (error: any) => {
            Swal.fire('ERROR', 'Error al Activar el Usuario', 'error')
          }
        )
      }
    })
  }



  enviarUsuarioToRoles(id: Number) {

    var user = this.usuarios.find((u: any) => u.idUsuario == id)


    this.usuariosService.setUsuarioGeneral(user);

    this.router.navigate(['/dashboard-admin-general/roles-usuario'])
  }

  next() {
    if (!this.last) {
      this.page++
      this.listarUsuarios()
      this.proSubscription = this.usuariosService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.cont + this.size;
          this.proSubscription.unsubscribe()
        }
      );
    }
  }

  back() {
    if (!this.first) {
      this.page--
      this.listarUsuarios()
      this.proSubscription = this.usuariosService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.cont - this.size;
          this.proSubscription.unsubscribe()
        }
      );
    }
  }

  goToPage(page: number) {
    this.page = page
    this.listarUsuarios()
    this.proSubscription = this.usuariosService.proSubject.subscribe(
      (con: boolean) => {
        this.isCon = con;
        this.cont = this.initialCon + (this.page * this.size);
        this.proSubscription.unsubscribe()
      }
    );
  }

}

