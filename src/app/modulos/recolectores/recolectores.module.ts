import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TopNavComponent} from './componentes/top-nav/top-nav.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {RecolectoresComponent} from './recolectores.component';
import {AppRoutingModule} from './app-routing-module';
import {MenuListItemComponent} from './componentes/menu-list-item/menu-list-item.component';
import {NavService} from './servicios/nav-service';
import {MatDialogModule} from '@angular/material/dialog';
import {MantenimientoFincasComponent} from './componentes/modals-mantenimientos/mantenimiento-fincas/mantenimiento-fincas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MantenimientoPersonasComponent} from './componentes/modals-mantenimientos/mantenimiento-personas/mantenimiento-personas.component';
import {MatTabsModule} from '@angular/material/tabs';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {EstadoSaludComponent} from './componentes/estado-salud/estado-salud.component';
import {FincasComponent} from './componentes/fincas/fincas.component';
import {PerfilComponent} from './componentes/perfil/perfil.component';

@NgModule({
  declarations: [RecolectoresComponent, InicioComponent, EstadoSaludComponent, FincasComponent, PerfilComponent, TopNavComponent, MenuListItemComponent,
    MantenimientoFincasComponent, MantenimientoPersonasComponent],
  entryComponents: [InicioComponent, EstadoSaludComponent, FincasComponent, MantenimientoFincasComponent, MantenimientoPersonasComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
  ],
  providers: [NavService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class RecolectoresModule {
}
