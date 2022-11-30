import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PestanasComponent } from './ComponentesConsignacion/pestanas/pestanas.component';
import { ConsultasComponent } from './ComponentesConsignacion/consultas/consultas.component';
import { IngresarComponent } from './ComponentesConsignacion/ingresar/ingresar.component';
import { ReportesComponent } from './ComponentesConsignacion/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    PestanasComponent,
    ConsultasComponent,
    IngresarComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
