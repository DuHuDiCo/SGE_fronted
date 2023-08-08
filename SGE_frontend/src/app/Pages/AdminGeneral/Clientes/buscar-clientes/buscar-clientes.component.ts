import { Component, OnInit } from '@angular/core';
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

  constructor(private clienteService:BuscarClientesService) { }

  ngOnInit(): void {

    this.clienteService.listarClientes().subscribe(
      (data:any) => {
        this.cliente = data;
        console.log(this.cliente)
      },
      (error) => {
        console.log(error);
        Swal.fire('Error al cargar los clientes')
      }
    )
  }

}
