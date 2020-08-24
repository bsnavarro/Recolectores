import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnidadComponent} from './componentes/unidad/unidad.component';

const routes: Routes = [{ path: '', component: UnidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
