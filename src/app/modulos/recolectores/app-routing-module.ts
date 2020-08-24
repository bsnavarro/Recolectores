import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecolectoresComponent} from './recolectores.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {EstadoSaludComponent} from './componentes/estado-salud/estado-salud.component';
import {FincasComponent} from './componentes/fincas/fincas.component';
import {PerfilComponent} from './componentes/perfil/perfil.component';

const routes: Routes = [
  {
    path: 'recolectores', component: RecolectoresComponent, children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'estadosalud', component: EstadoSaludComponent},
      {path: 'fincas', component: FincasComponent},
      {path: 'perfil', component: PerfilComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
