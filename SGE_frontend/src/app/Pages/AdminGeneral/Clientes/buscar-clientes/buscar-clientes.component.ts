import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { BuscarClientesService } from 'src/app/Services/clientes/BuscarClientes/buscar-clientes.service';
import { Cliente } from 'src/app/Types/Cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {

  cliente: Cliente[] = []
  

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  cedula: string = ''

  constructor(private clienteService:BuscarClientesService, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  private listarClientes() {
    this.clienteService.listarClientes().subscribe(
      (data:any) => {
        this.cliente = data;
        console.log(this.cliente);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error al cargar los clientes');
      }
    );
  }

  public filtrar(){
    this.cliente = [];
    if (this.cedula) {
      this.clienteService.filtrarClientes(this.cedula).subscribe(
        (data:any) => {
          this.cliente.push(data);
          console.log(this.cliente);
        },
        (error) => {
          console.log(error);
          Swal.fire('Error al filtrar los Clientes');
        }
      );
    } else {
      this.listarClientes();
    }
  }

  public eliminarCliente(idCliente:Number){

    let username  = this.authService.getUsername()

    Swal.fire({
      title:'Eliminar El Cliente',
      text:'¿Estas seguro de eliminar el Cliente?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.clienteService.eliminarCliente(idCliente, username).subscribe(
          (data:any) => {
            this.cliente = this.cliente.filter((cliente:Cliente) => cliente.idCliente != idCliente);
            Swal.fire('Cliente Eliminado', 'El Cliente ha sido Eliminado Exitosamente','success')
          },
          (error) => {
            console.log(error
              );
            
            Swal.fire('Error al Eliminar el Cliente','error')
          }
        )
      }
    })

  }
}






