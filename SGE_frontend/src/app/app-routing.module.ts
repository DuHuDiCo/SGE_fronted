import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentesGenerales/login/login.component';
import { OpcionesComponent } from './componentesGenerales/opciones/opciones.component';
import { PerfilUsuarioComponent } from './componentesGenerales/perfil-usuario/perfil-usuario.component';
import { CrearUsuariosComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/crear-usuarios/crear-usuarios.component';
import { GestionUsuariosComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/gestion-usuarios.component';

import { RolesUsuarioComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/roles-usuario/roles-usuario.component';


import { DashboardAdminComponent } from './Pages/Administracion/pages/dashboard-admin/dashboard-admin.component';
import { EstadisticasDashboardComponent } from './Pages/Cartera/pages/componentesCartera/estadisticas-dashboard/estadisticas-dashboard.component';
import { GestionComponent } from './Pages/Cartera/pages/componentesCartera/gestion/gestion.component';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';
import { ConsultasComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/consultas/consultas.component';
import { IngresarComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/ingresar/ingresar.component';
import { ReportesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/reportes/reportes.component';
import { DashboarConsignacionesComponent } from './Pages/Consignaciones/pages/dashboar-consignaciones/dashboar-consignaciones.component';



const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch:'full' },
  {path:'login', component:LoginComponent},

  {
    path:'opciones', 
    component:OpcionesComponent,
    children:[]
  },
  {
    path: 'cartera', redirectTo:'dashboard-cartera/inicio' , pathMatch:'full' 
  }
  ,
  {
    path:"dashboard-cartera",
    component:DashboardComponent,
    children:[
      {
        path:"gestion",
        component:GestionComponent,
       
      },
      {
        path:"inicio",
        component:EstadisticasDashboardComponent
      }
    ]
  },
  {
    path:"perfil-usuario",
    component:PerfilUsuarioComponent,
    children:[]
  }  
  ,
  {path: 'consignaciones', redirectTo:'dashboard-consignaciones/consultar' , pathMatch:'full' }
  ,
  {
    path:'dashboard-consignaciones',
    component:DashboarConsignacionesComponent,
    children:[
      {
        path:'ingresar',
        component:IngresarComponent
        
      },
      {
        path:'consultar',
        component:ConsultasComponent
        
      },
      {
        path:'reportes',
        component:ReportesComponent
        
      },
    ]
  },
  {path: 'administracion', redirectTo:'dashboard-administracion/gestionUsuarios' , pathMatch:'full' }
  
  ,
  {
    path:"dashboard-administracion",
    component:DashboardAdminComponent,
    children:[
      {
        path:'gestionUsuarios',
        component:GestionUsuariosComponent
        
        
      },
      {
        path:'crearUsuarios',
        component:CrearUsuariosComponent
      }
      ,
      {
        path:'rolesUsuario/:usuarioId',
        component: RolesUsuarioComponent
      }
      
    ]
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
