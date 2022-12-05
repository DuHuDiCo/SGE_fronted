import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentesGenerales/login/login.component';
import { OpcionesComponent } from './componentesGenerales/opciones/opciones.component';
import { PerfilUsuarioComponent } from './componentesGenerales/perfil-usuario/perfil-usuario.component';
import { GestionComponent } from './Pages/Cartera/pages/componentesCartera/gestion/gestion.component';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';
import { ConsultasComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/consultas/consultas.component';
import { IngresarComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/ingresar/ingresar.component';

import { ReportesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/reportes/reportes.component';
import { InicioComponent } from './Pages/Consignaciones/pages/inicio/inicio.component';

const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch:'full' },
  {path:'login', component:LoginComponent},

  {
    path:'opciones', 
    component:OpcionesComponent,
    children:[]
  },
  {
    path:"cartera",
    component:DashboardComponent,
    children:[]
  },
  {
    path:"perfil-usuario",
    component:PerfilUsuarioComponent,
    children:[]
  },
  {
    path:"gestion",
    component:GestionComponent,
    children:[]
  },
  {
    path:'consignaciones',
    component:InicioComponent,
    pathMatch: 'full'
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
