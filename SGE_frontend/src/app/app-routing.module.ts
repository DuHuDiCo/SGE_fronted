import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentesGenerales/login/login.component';
import { OpcionesComponent } from './componentesGenerales/opciones/opciones.component';
import { PerfilUsuarioComponent } from './componentesGenerales/perfil-usuario/perfil-usuario.component';
import { CrearUsuariosComponent } from './Pages/Administracion/pages/crear-usuarios/crear-usuarios.component';
import { GestionUsuariosComponent } from './Pages/Administracion/pages/gestion-usuarios/gestion-usuarios.component';
import { PermisosGeneralesComponent } from './Pages/Administracion/pages/permisos-generales/permisos-generales.component';
import { GestionComponent } from './Pages/Cartera/pages/componentesCartera/gestion/gestion.component';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';
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
  {
    path:"gestion-usuarios",
    component:GestionUsuariosComponent,
    children:[]
  },
  {
    path:"permisos-generales",
    component:PermisosGeneralesComponent,
    children:[]
  },
  {
    path:"crear-usuarios",
    component:CrearUsuariosComponent,
    children:[]
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
