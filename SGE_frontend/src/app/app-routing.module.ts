import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentesGenerales/login/login.component';
import { OpcionesComponent } from './componentesGenerales/opciones/opciones.component';
import { PerfilUsuarioComponent } from './componentesGenerales/perfil-usuario/perfil-usuario.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { LoginGuard } from './Guards/login.guard';
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
import { IncapacidadArlComponent } from './Pages/SST/pages/componentes_SST/asistencia/incapacidad-arl/incapacidad-arl.component';
import { IncapacidadGComponent } from './Pages/SST/pages/componentes_SST/asistencia/incapacidad-g/incapacidad-g.component';
import { EvidenciasComponent } from './Pages/SST/pages/componentes_SST/Copasst/evidencias/evidencias.component';
import { Evalucion1Component } from './Pages/SST/pages/componentes_SST/Evaluaciones/evalucion1/evalucion1.component';
import { ObservacionesComponent } from './Pages/SST/pages/componentes_SST/inspeccion/observaciones/observaciones.component';
import { AccidentesComponent } from './Pages/SST/pages/componentes_SST/reportes/accidentes/accidentes.component';
import { IncidentesComponent } from './Pages/SST/pages/componentes_SST/reportes/incidentes/incidentes.component';
import { DashboardSSTComponent } from './Pages/SST/pages/dashboard-sst/dashboard-sst.component';



const routes: Routes = [
  {path: '', redirectTo:'login' , pathMatch:'full' },
  {
    path:'login', 
    component:LoginComponent,
    canActivate: [LoginGuard]
  },

  {
    path:'opciones', 
    component:OpcionesComponent,
    canActivate:[AuthenticationGuard]
   
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

  {path: 'sst', redirectTo:'dashboard-sst' , pathMatch:'full' },
  {
    path:"dashboard-sst",
    component:DashboardSSTComponent,
    children:[
      {
        path:'incapacidad-g',
        component:IncapacidadGComponent
      },
      {
        path:'incapacidad-arl',
        component:IncapacidadArlComponent
      },
      {
        path:'accidentes',
        component:AccidentesComponent
      },
      {
        path:'incidentes',
        component:IncidentesComponent
      },
      {
        path:'observaciones',
        component:ObservacionesComponent
      },
      {
        path:'evidencia',
        component:EvidenciasComponent
      },
      {
        path:'co-evidencias',
        component:EvidenciasComponent
      },
      {
        path:'evaluacion1',
        component:Evalucion1Component
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
