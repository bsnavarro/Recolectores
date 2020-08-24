import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SistemasComponent} from './sistemas.component';
import {LoginGuardService} from './servicios/login-guard.service';
import {PersonasComponent} from "../personas/personas.component";

const routes: Routes = [
  {
    path: '',
    component: SistemasComponent,
    canActivate: [LoginGuardService],
    children: [
      {
        path: 'seguridad/:sistema',
        canActivate: [LoginGuardService],
        loadChildren: '../seguridad/seguridad.module#SeguridadModule'
      },
      {
        path: 'aceptacion/:sistema',
        canActivate: [LoginGuardService],
        loadChildren: '../aceptacion/aceptacion.module#AceptacionModule'
      },
      {
        path: 'horas-planilla/:sistema',
        canActivate: [LoginGuardService],
        loadChildren: '../horas-planilla/dashboard.module#DashboardModule'
      },
      {
        path: 'personas/:sistema',
        canActivate: [LoginGuardService],
        loadChildren: '../personas/personas.module#PersonasModule'
      },
      {
        path: 'parametros-planilla/:sistema',
        canActivate: [LoginGuardService],
        loadChildren: '../parametros-planilla/parametros-planilla.module#ParametrosPlanillaModule'
      }
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
