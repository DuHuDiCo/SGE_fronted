import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './ComponentesConsignacion/consultas/consultas.component';
import { IngresarComponent } from './ComponentesConsignacion/ingresar/ingresar.component';
import { PestanasComponent } from './ComponentesConsignacion/pestanas/pestanas.component';
import { ReportesComponent } from './ComponentesConsignacion/reportes/reportes.component';


const routes: Routes = [
  {path: '', redirectTo:'pestanas' , pathMatch:'full' },
  {path:'pestanas', component:PestanasComponent},
  {
    path:'consultas', 
    component:ConsultasComponent,
    children:[]
  },
  {
    path:'ingresar',
    component:IngresarComponent,
    children:[]
  },
  {
    path:'reportes',
    component:ReportesComponent,
    children:[]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
