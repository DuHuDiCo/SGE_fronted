import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './componentesGenerales/sidebar/sidebar.component';
<<<<<<< HEAD
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';
import { NavbarComponent } from './componentesGenerales/navbar/navbar.component';
import { SidebarCarteraComponent } from './Pages/Cartera/pages/componentesCartera/sidebar-cartera/sidebar-cartera.component';
=======
>>>>>>> parent of 3bc4747 (commit 26/10/2022)

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarCarteraComponent
=======
    SidebarComponent
>>>>>>> parent of 3bc4747 (commit 26/10/2022)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
