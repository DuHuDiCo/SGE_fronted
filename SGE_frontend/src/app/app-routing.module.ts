import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Pages/Cartera/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"cartera",
    component:DashboardComponent,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
