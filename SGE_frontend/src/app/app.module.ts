import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentesGenerales/login/login.component';
import { OpcionesComponent } from './componentesGenerales/opciones/opciones.component';
import { SidebarComponent } from './componentesGenerales/sidebar/sidebar.component';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';
import { NavbarComponent } from './componentesGenerales/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { PerfilUsuarioComponent } from './componentesGenerales/perfil-usuario/perfil-usuario.component';
import { GestionComponent } from './Pages/Cartera/pages/componentesCartera/gestion/gestion.component';
import { HttpClientModule} from '@angular/common/http';
import { RolesPerfilesDirective } from './directivas/roles-perfiles.directive';
import { authInterceptorProviders } from './Interceptors/auth.interceptor';


import { ConsultasComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/consultas/consultas.component';
import { IngresarComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/ingresar/ingresar.component';
import { ReportesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/reportes/reportes.component';
import { GestionUsuariosComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/gestion-usuarios.component';
import { CrearUsuariosComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/crear-usuarios/crear-usuarios.component';
import { RolesUsuarioComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/roles-usuario/roles-usuario.component';
import { AsignarRolesComponent } from './Pages/Administracion//pages/componenetesAdminstracion/asignar-roles/asignar-roles.component';


import { IncapacidadGComponent } from './Pages/SST/pages/componentes_SST/asistencia/incapacidad-g/incapacidad-g.component';
import { IncapacidadArlComponent } from './Pages/SST/pages/componentes_SST/asistencia/incapacidad-arl/incapacidad-arl.component';
import { AccidentesComponent } from './Pages/SST/pages/componentes_SST/reportes/accidentes/accidentes.component';
import { IncidentesComponent } from './Pages/SST/pages/componentes_SST/reportes/incidentes/incidentes.component';
import { ObservacionesComponent } from './Pages/SST/pages/componentes_SST/inspeccion/observaciones/observaciones.component';
import { EvidenciasComponent } from './Pages/SST/pages/componentes_SST/Copasst/evidencias/evidencias.component';
import { CoEvidenciaComponent } from './Pages/SST/pages/componentes_SST/comite/co-evidencia/co-evidencia.component';
import { Evalucion1Component } from './Pages/SST/pages/componentes_SST/Evaluaciones/evalucion1/evalucion1.component';


import { SidebarSstComponent } from './Pages/SST/pages/componentes_SST/sidebar-sst/sidebar-sst.component';
import { SidebarCarteraComponent } from './Pages/Cartera/pages/componentesCartera/sidebar-cartera/sidebar-cartera.component';
import { SidebarConsignacionesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/sidebar-consignaciones/sidebar-consignaciones.component';
import { SidebarAdministracionComponent } from './Pages/Administracion/pages/componenetesAdminstracion/sidebar-administracion/sidebar-administracion.component';
import { SidebarCreditoComponent } from './Pages/Creditos/sidebar-credito/sidebar-credito.component';


import { DashboardAdminComponent } from './Pages/Administracion/pages/dashboard-admin/dashboard-admin.component';
import { DashboardSSTComponent } from './Pages/SST/pages/dashboard-sst/dashboard-sst.component';
import { DashboardCreditosComponent } from './Pages/Creditos/dashboard-creditos/dashboard-creditos.component';
import { DashboarConsignacionesComponent } from './Pages/Consignaciones/pages/dashboar-consignaciones/dashboar-consignaciones.component';
import { EstadisticasDashboardComponent } from './Pages/Cartera/pages/componentesCartera/estadisticas-dashboard/estadisticas-dashboard.component';



import { CrearCreditoComponent } from './Pages/Creditos/Componentes_creditos/crear-credito/crear-credito.component';
import { VerCreditosComponent } from './Pages/Creditos/Componentes_creditos/ver-creditos/ver-creditos.component';
import { CreditosCreadosComponent } from './Pages/Creditos/Componentes_creditos/creditos-creados/creditos-creados.component';
import { DashboardArchivosComponent } from './Pages/Archivos/dashboard-archivos/dashboard-archivos.component';
import { ArchivosExsComponent } from './Pages/Archivos/componentes_archivos/archivos-exs/archivos-exs.component';
import { ArchivosNComponent } from './Pages/Archivos/componentes_archivos/archivos-n/archivos-n.component';
import { SidebarArchivosComponent } from './Pages/Archivos/componentes_archivos/sidebar-archivos/sidebar-archivos.component';
import { DashboardVentasComponent } from './Pages/Ventas/dashboard-ventas/dashboard-ventas.component';
import { SidebarVentasComponent } from './Pages/Ventas/componentesVentas/sidebar-ventas/sidebar-ventas.component';
import { ProcesoVentasComponent } from './Pages/Ventas/componentesVentas/proceso-ventas/proceso-ventas.component';
import { ResultadosSstComponent } from './Pages/SST/pages/componentes_SST/inspeccion/resultados-sst/resultados-sst.component';
import { ReportesSstComponent } from './Pages/SST/pages/componentes_SST/inspeccion/reportes-sst/reportes-sst.component';
import { ListaChequeoComponent } from './Pages/SST/pages/componentes_SST/inspeccion/lista-chequeo/lista-chequeo.component';
import { DashboardServiciosComponent } from './Pages/Servicios/dashboard-servicios/dashboard-servicios.component';
import { SidebarServiciosComponent } from './Pages/Servicios/sidebar-servicios/sidebar-servicios.component';
import { EstadisticasComponent } from './Pages/Cartera/pages/componentesCartera/estadisticas/estadisticas.component';
import { DashboardSuperAdminComponent } from './Pages/AdminGeneral/dashboard-super-admin/dashboard-super-admin.component';
import { SidebarAdminGeneralComponent } from './Pages/AdminGeneral/componentes/sidebar-admin-general/sidebar-admin-general.component';
import { SystemRolesComponent } from './Pages/AdminGeneral/componentes/RoleyPermisos/system-roles/system-roles.component';
import { SystemPermisosComponent } from './Pages/AdminGeneral/componentes/RoleyPermisos/system-permisos/system-permisos.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OpcionesComponent,


    NavbarComponent,
    PerfilUsuarioComponent,
    GestionComponent,
    ConsultasComponent,
    IngresarComponent,
    ReportesComponent,
    GestionUsuariosComponent,
    CrearUsuariosComponent,
    RolesUsuarioComponent,
    AsignarRolesComponent,
    IncapacidadGComponent,


    RolesPerfilesDirective,
    IncapacidadArlComponent,
    AccidentesComponent,
    IncidentesComponent,
    ObservacionesComponent,
    EvidenciasComponent,
    CoEvidenciaComponent,
    Evalucion1Component,


    SidebarComponent,
    SidebarCarteraComponent,
    SidebarConsignacionesComponent,
    SidebarAdministracionComponent,
    SidebarSstComponent,
    SidebarCreditoComponent,
    SidebarVentasComponent,

    EstadisticasDashboardComponent,
    DashboardComponent,
    DashboardCreditosComponent,
    DashboarConsignacionesComponent,
    DashboardSSTComponent,
    DashboardAdminComponent,



    CrearCreditoComponent,
    VerCreditosComponent,
    CreditosCreadosComponent,
    DashboardArchivosComponent,
    ArchivosExsComponent,
    ArchivosNComponent,
    SidebarArchivosComponent,
    DashboardVentasComponent,
    ProcesoVentasComponent,
    ResultadosSstComponent,
    ReportesSstComponent,
    ListaChequeoComponent,
    DashboardServiciosComponent,
    SidebarServiciosComponent,
    EstadisticasComponent,
    DashboardSuperAdminComponent,
    SidebarAdminGeneralComponent,
    SystemRolesComponent,
    SystemPermisosComponent,


  

  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   
  ],


  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
