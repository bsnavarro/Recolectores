import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AceptacionComponent} from './aceptacion.component';


const routes: Routes = [
  {path: '', component: AceptacionComponent}
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
