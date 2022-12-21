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


import { ConsultasComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/consultas/consultas.component';
import { IngresarComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/ingresar/ingresar.component';
import { ReportesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/reportes/reportes.component';


import { GestionUsuariosComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/gestion-usuarios.component';

import { CrearUsuariosComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/crear-usuarios/crear-usuarios.component';
import { DashboardAdminComponent } from './Pages/Administracion/pages/dashboard-admin/dashboard-admin.component';

import { RolesUsuarioComponent } from './Pages/Administracion/pages/componenetesAdminstracion/gestion-usuarios/roles-usuario/roles-usuario.component';
import { DashboarConsignacionesComponent } from './Pages/Consignaciones/pages/dashboar-consignaciones/dashboar-consignaciones.component';
import { EstadisticasDashboardComponent } from './Pages/Cartera/pages/componentesCartera/estadisticas-dashboard/estadisticas-dashboard.component';
import { SidebarCarteraComponent } from './Pages/Cartera/pages/componentesCartera/sidebar-cartera/sidebar-cartera.component';
import { SidebarConsignacionesComponent } from './Pages/Consignaciones/pages/componentesConsignaciones/sidebar-consignaciones/sidebar-consignaciones.component';
import { SidebarAdministracionComponent } from './Pages/Administracion/pages/componenetesAdminstracion/sidebar-administracion/sidebar-administracion.component';
import { AsignarRolesComponent } from './Pages/Administracion//pages/componenetesAdminstracion/asignar-roles/asignar-roles.component';
import { DashboardSSTComponent } from './Pages/SST/pages/dashboard-sst/dashboard-sst.component';
import { SidebarSstComponent } from './Pages/SST/pages/componentes_SST/sidebar-sst/sidebar-sst.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OpcionesComponent,
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    PerfilUsuarioComponent,
    GestionComponent,
    ConsultasComponent,
    IngresarComponent,
    ReportesComponent,
    GestionUsuariosComponent,
    CrearUsuariosComponent,
    DashboardAdminComponent,
    RolesUsuarioComponent,
    DashboarConsignacionesComponent,
    EstadisticasDashboardComponent,
    SidebarCarteraComponent,
    SidebarConsignacionesComponent,
    SidebarAdministracionComponent,
    AsignarRolesComponent,
    DashboardSSTComponent,
    SidebarSstComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
