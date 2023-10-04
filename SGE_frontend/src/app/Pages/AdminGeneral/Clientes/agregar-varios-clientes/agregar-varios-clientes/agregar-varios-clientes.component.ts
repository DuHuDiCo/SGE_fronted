import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { AgregarVariosClientesService } from 'src/app/Services/clientes/AgregarVarios/agregar-varios-clientes.service';
import { Cliente } from 'src/app/Types/Cliente';
import { nuevosClientes } from 'src/app/Types/NuevosClientes';
import baseUrl from 'src/app/utils/helper';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-agregar-varios-clientes',
  templateUrl: './agregar-varios-clientes.component.html',
  styleUrls: ['./agregar-varios-clientes.component.css']
})

export class AgregarVariosClientesComponent implements OnInit{

  files:string = ''
  delimitante:string = ''
  formdata:FormData = new FormData()
  formModal:any;

  excepciones:string[] = []
  clientes:nuevosClientes[] = []
  cambios:string[] = []
  cliente:Cliente[] = []

  mostrarClientes:boolean = false;
 
 constructor(private authService:AuthenticationService, private http:HttpClient, private variosClientes:AgregarVariosClientesService) { }

 ngOnInit(): void {

  this.formModal = new window.bootstrap.Modal(
    document.getElementById('modal')
  );
  
  }

  obtenerArchivo(event:any){
   this.files= event.target.files[0]
  }

  subirArchivos(){
    this.formdata.append("files", this.files) 
    const username = this.authService.getUsername();
    if(username == null){
      return
    }
    this.variosClientes.subirArchivo(this.formdata, this.delimitante, username).subscribe(
      (data:any) => {
        if(data.Exceptions.length > 0){
          this.excepciones = data.Exceptions
          this.clientes = data.Clientes
          this.cambios = data.Cambios       
          Swal.fire('Error de Validacion', `Algunos registros no fueron validados: ${data.Exceptions.length}` , 'error')
          this.formModal.show();
          this.mostrarClientes = true
          return
        }
      },(error:any) => {
        
      }
    )
  }

  guardarCambios(){
    this.variosClientes.guardarArchivo(this.clientes).subscribe(
      (data:any) => {
        this.cliente = data
        Swal.fire('Cliente Guardado exito', 'Cliente Guardado con exito', 'success')
        setTimeout(() => {
        location.reload()
        }, 2000);
        
      }, (error:any) => {
        
        Swal.fire('Error', 'Error al guardar el Cliente', 'error')
      }
    )
  }
}


