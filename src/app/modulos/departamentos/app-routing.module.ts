import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartamentosComponent} from './departamentos.component';
import {LoginGuardService} from './servicios/login-guard.service';

const routes: Routes = [
  {path: '', component: DepartamentosComponent, canActivate: [LoginGuardService],  children: [
      {path: 'sistemas', loadChildren: '../sistemas/sistemas.module#SistemasModule'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
