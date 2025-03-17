import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Datos } from 'src/app/Types/DatosUsuarios';
import { Sede } from 'src/app/Types/Sede';
import { Usuario } from 'src/app/Types/Usuario';
import { users } from 'src/app/Types/Usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
})
export class BuscarUsuariosComponent implements OnInit {
  cont: number = 1;
  isCon: boolean = false;
  initialCon: number = 1;

  last: boolean = false;
  first: boolean = false;

  page: number = 0;
  size: number = 20;

  paginas!: Array<number>;

  private proSubscription!: Subscription;

  editar: boolean = false;
  reseteo: boolean = false;

  ngOnInit(): void {
    this.listarUsuarios();
    this.obtenerSede();
  }

  usuarios: users[] = [];

  rolesArray: string[] = [
    'Cartera',
    'Caja',
    'Archivos',
    'Ventas',
    'Servicios',
    'Consignaciones',
    'SUPERADMINISTRADOR',
    'SST',
  ];
  Sede: Sede[] = [];

  nombre: string = '';

  datos: Datos = {
    username: '',
    passwordUser: '',
    datoToDelete: '',
  };

  usuario: any = {
    username: '',
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    celular: '',
    fecha_nacimiento: new Date(),
    sede: '',
    roles: [],
    idUsuario: 0,
  };

  users: any = {
    idUsuario: 0,
    username: '',
    fechaNac: new Date(),
    nombres: '',
    apellidos: '',
    sede: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    telefono: '',
  };

  constructor(
    private usuariosService: BuscarUsuariosService,
    private authService: AuthenticationService,
    private router: Router,
    private sede: SedeService
  ) {}

  private listarUsuarios() {
    this.usuariosService.listarUsuarios(this.page, this.size).subscribe(
      (data: any) => {
        this.usuarios = data.content;

        this.paginas = new Array(data.totalPages);
        this.last = data.last;
        this.first = data.first;
        this.usuariosService.proSubject.next(true);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los usuarios',
          iconColor: '#960010',
          confirmButtonColor: '#960010',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
      }
    );
  }

  public filtrarUsuarios() {
    this.usuarios = [];
    if (this.nombre) {
      this.usuariosService.filtrarUsuarios(this.nombre).subscribe(
        (data: any) => {
          this.usuarios = data;
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al filtrar los usuarios',
            iconColor: '#960010',
            confirmButtonColor: '#960010',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
        }
      );
    } else {
      this.listarUsuarios();
    }
  }

  public desactivarUsuario() {
    let username = this.authService.getUsername();

    if (username === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el nombre de usuario',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.datos.username = username;

    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe colocar la contraseña',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Desactivar El Cliente',
      text: '¿Estás seguro de desactivar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn border-0 rounded-pill px-4',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.desactivarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario desactivado',
              text: 'El usuario ha sido desactivado exitosamente',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.datos = {
              username: '',
              passwordUser: '',
              datoToDelete: '',
            };
            window.location.reload();
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al desactivar el usuario',
              iconColor: '#960010',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
          }
        );
      }
    });
  }

  public activarUsuario() {
    let username = this.authService.getUsername();

    if (username === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el nombre de usuario',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.datos.username = username;

    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe colocar la contraseña',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Activar el cliente',
      text: '¿Estas seguro de activar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn border-0 rounded-pill px-4',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.activarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario activado',
              text: 'El usuario ha sido activado exitosamente',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.datos = {
              username: '',
              passwordUser: '',
              datoToDelete: '',
            };
            window.location.reload();
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al activar el usuario',
              iconColor: '#960010',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
          }
        );
      }
    });
  }

  enviarUsuarioToRoles(id: Number) {
    var user = this.usuarios.find((u: any) => u.idUsuario == id);

    this.usuariosService.setUsuarioGeneral(user);

    this.router.navigate(['/dashboard-admin-general/roles-usuario']);
  }

  next() {
    if (!this.last) {
      this.page++;
      this.listarUsuarios();
      this.proSubscription = this.usuariosService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.cont + this.size;
          this.proSubscription.unsubscribe();
        }
      );
    }
  }

  back() {
    if (!this.first) {
      this.page--;
      this.listarUsuarios();
      this.proSubscription = this.usuariosService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.cont - this.size;
          this.proSubscription.unsubscribe();
        }
      );
    }
  }

  goToPage(page: number) {
    this.page = page;
    this.listarUsuarios();
    this.proSubscription = this.usuariosService.proSubject.subscribe(
      (con: boolean) => {
        this.isCon = con;
        this.cont = this.initialCon + this.page * this.size;
        this.proSubscription.unsubscribe();
      }
    );
  }

  obtenerSede() {
    this.sede.getSedes().subscribe(
      (data: any) => {
        this.Sede = data;
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las sedes',
          iconColor: '#960010',
          confirmButtonColor: '#960010',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
      }
    );
  }

  editarUsuario() {
    if (
      this.usuario.username.trim() == '' ||
      this.usuario.username.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el nombre de usuario',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuario.nombres.trim() == '' ||
      this.usuario.nombres.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar los nombres',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuario.fecha_nacimiento instanceof Date ||
      this.usuario.fecha_nacimiento == ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar la fecha de nacimiento',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuario.apellidos.trim() == '' ||
      this.usuario.apellidos.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar los apellidos',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (this.usuario.sede.trim() == '' || this.usuario.sede.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de seleccionar la sede',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuario.tipo_documento.trim() == '' ||
      this.usuario.tipo_documento.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el tipo de doc',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuario.numero_documento == '' ||
      this.usuario.numero_documento == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar el numero de doc',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el email',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (this.usuario.celular == '' || this.usuario.celular == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el celular',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.users.idUsuario = this.usuario.idUsuario;
    this.users.username = this.usuario.username;
    this.users.nombres = this.usuario.nombres;
    this.users.apellidos = this.usuario.apellidos;
    this.users.tipoDocumento = this.usuario.tipo_documento;
    this.users.numeroDocumento = this.usuario.numero_documento;
    this.users.correo = this.usuario.email;
    this.users.telefono = this.usuario.celular;
    this.users.fechaNac = this.usuario.fecha_nacimiento;
    this.users.sede = this.usuario.sede;

    this.editar = true;
    setTimeout(() => {
      this.usuariosService.updateUser(this.users).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Usuario Actualizado Con Éxito',
            timer: 3000,
            confirmButtonColor: '#960010',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          this.editar = false;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el usuario',
            timer: 3000,
            iconColor: '#960010',
            confirmButtonColor: '#960010',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          this.editar = false;
          console.log(error);
        }
      );
    }, 2000);
  }

  getUser(id: number) {
    this.usuariosService.getUserById(id).subscribe(
      (data: any) => {
        this.usuario = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  resetPassword(username: string) {
    Swal.fire({
      title: 'Resetear La Contraseña',
      text: `¿Estás seguro de Resetear La Contraseña de ${username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn border-0 rounded-pill px-4',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.reseteo = true;
        setTimeout(() => {
          this.usuariosService.resetPassword(username).subscribe(
            (data: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Datos Guardados',
                text: 'La Contraseña Se Ha Reestablecido Con Éxito',
                timer: 3000,
                confirmButtonColor: '#960010',
                customClass: {
                  popup: 'rounded-4',
                  confirmButton: 'text-white btn border-0 rounded-pill px-4',
                },
              });
              this.reseteo = false;
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al resetear la contraseña',
                timer: 3000,
                iconColor: '#960010',
                confirmButtonColor: '#960010',
                customClass: {
                  popup: 'rounded-4',
                  confirmButton: 'text-white btn border-0 rounded-pill px-4',
                },
              });
              this.reseteo = false;
            }
          );
        }, 2000);
      }
    });
  }
}
