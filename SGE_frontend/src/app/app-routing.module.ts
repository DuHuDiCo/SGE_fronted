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
import { CrearCreditoComponent } from './Pages/Creditos/Componentes_creditos/crear-credito/crear-credito.component';
import { VerCreditosComponent } from './Pages/Creditos/Componentes_creditos/ver-creditos/ver-creditos.component';

import { DashboardAdminComponent } from './Pages/Administracion/pages/dashboard-admin/dashboard-admin.component';
import { EstadisticasDashboardComponent } from './Pages/Cartera/pages/componentesCartera/estadisticas-dashboard/estadisticas-dashboard.component';
import { GestionComponent } from './Pages/Cartera/pages/componentesCartera/gestion/gestion.component';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';
import { ConsultasComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/consultas/consultas.component';
import { IngresarComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/ingresar/ingresar.component';
import { ReportesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/reportes/reportes.component';
import { DashboarConsignacionesComponent } from './Pages/Consignaciones/pages/dashboar-consignaciones/dashboar-consignaciones.component';


import { DashboardCreditosComponent } from './Pages/Creditos/dashboard-creditos/dashboard-creditos.component';
import { IncapacidadArlComponent } from './Pages/SST/pages/componentes_SST/asistencia/incapacidad-arl/incapacidad-arl.component';
import { IncapacidadGComponent } from './Pages/SST/pages/componentes_SST/asistencia/incapacidad-g/incapacidad-g.component';
import { EvidenciasComponent } from './Pages/SST/pages/componentes_SST/Copasst/evidencias/evidencias.component';
import { Evalucion1Component } from './Pages/SST/pages/componentes_SST/Evaluaciones/evalucion1/evalucion1.component';
import { ObservacionesComponent } from './Pages/SST/pages/componentes_SST/inspeccion/observaciones/observaciones.component';
import { AccidentesComponent } from './Pages/SST/pages/componentes_SST/reportes/accidentes/accidentes.component';
import { IncidentesComponent } from './Pages/SST/pages/componentes_SST/reportes/incidentes/incidentes.component';
import { DashboardSSTComponent } from './Pages/SST/pages/dashboard-sst/dashboard-sst.component';
import { CreditosCreadosComponent } from './Pages/Creditos/Componentes_creditos/creditos-creados/creditos-creados.component';
import { DashboardArchivosComponent } from './Pages/Archivos/dashboard-archivos/dashboard-archivos.component';
import { ArchivosExsComponent } from './Pages/Archivos/componentes_archivos/archivos-exs/archivos-exs.component';
import { DashboardVentasComponent } from './Pages/Ventas/dashboard-ventas/dashboard-ventas.component';
import { ProcesoVentasComponent } from './Pages/Ventas/componentesVentas/proceso-ventas/proceso-ventas.component';
import { ListaChequeoComponent } from './Pages/SST/pages/componentes_SST/inspeccion/lista-chequeo/lista-chequeo.component';
import { ReportesSstComponent } from './Pages/SST/pages/componentes_SST/inspeccion/reportes-sst/reportes-sst.component';
import { ResultadosSstComponent } from './Pages/SST/pages/componentes_SST/inspeccion/resultados-sst/resultados-sst.component';
import { EstadisticasComponent } from './Pages/Cartera/pages/componentesCartera/estadisticas/estadisticas.component';



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
      },
      {
        path:"estadisticas",
        component:EstadisticasComponent
      }
    ]
  },
  {
    path:"perfil-usuario",
    component:PerfilUsuarioComponent,
    children:[]
  },



  {path: 'consignaciones', redirectTo:'dashboard-consignaciones/consultar' , pathMatch:'full' },
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



  {path: 'administracion', redirectTo:'dashboard-administracion/gestionUsuarios' , pathMatch:'full' },
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
      },
      {
        path:'lista-chequeo',
        component:ListaChequeoComponent
      },
      {
        path:'reportes-sst',
        component:ReportesSstComponent
      },
      {
        path:'resultados-sst',
        component:ResultadosSstComponent
      },
    ]
  },

  {path: 'Creditos', redirectTo:'dashboard-creditos' , pathMatch:'full' },
  {
    path:"dashboard-creditos",
    component:DashboardCreditosComponent,
    children:[
      {
        path:'ver-creditos',
        component:VerCreditosComponent
      },
      {
        path:'crear-credito',
        component:CrearCreditoComponent
      },
      {
        path:'creditos-creados',
        component:CreditosCreadosComponent
      },
    ]
  },

  {path: 'Archivos', redirectTo:'dashboard-archivos' , pathMatch:'full' },
  {
    path:"dashboard-archivos",
    component:DashboardArchivosComponent,
    children:[
      {
        path:'archivos-exs',
        component:ArchivosExsComponent
      },
    ]
  },


  {path: 'Ventas', redirectTo:'dashboard-ventas' , pathMatch:'full' },
  {
    path:"dashboard-ventas",
    component:DashboardVentasComponent,
    children:[
      {
        path:'proceso-ventas',
        component:ProcesoVentasComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
