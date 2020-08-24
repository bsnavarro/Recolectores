import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecolectoresComponent} from './modulos/recolectores/recolectores.component';

const routes: Routes = [

  {
    path: '', children: [
      {path: '', redirectTo: '/autenticacion', pathMatch: 'full'},
      {path: 'autenticacion', loadChildren: './modulos/autenticacion/autenticacion.module#AutenticacionModule'},
      {path: 'departamentos', loadChildren: './modulos/departamentos/departamentos.module#DepartamentosModule'},
      {path: 'departamento/:departamento', loadChildren: './modulos/sistemas/sistemas.module#SistemasModule'},
    ]
  },
  {path: 'recolectores', component: RecolectoresComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
