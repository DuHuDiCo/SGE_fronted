import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarClienteComponent } from 'src/app/Pages/AdminGeneral/Clientes/agregar-cliente/agregar-cliente.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AgregarClienteComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AgregarClienteModule { }
