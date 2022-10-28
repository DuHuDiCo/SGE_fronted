import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentesGenerales/login/login.component';
import { OpcionesComponent } from './componentesGenerales/opciones/opciones.component';
import { PerfilUsuarioComponent } from './componentesGenerales/perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
