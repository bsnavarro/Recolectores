import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AutenticacionComponent} from './autenticacion.component';
import {LoginGuardService} from './servicios/login-guard.service';

const routes: Routes = [
  {path: '', component: AutenticacionComponent, canActivate: [LoginGuardService], children: [
      {path: 'departamentos', loadChildren: '../departamentos/departamentos.module#DepartamentosModule'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
