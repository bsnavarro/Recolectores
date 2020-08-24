import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ColaboradorUnidadComponent } from './componentes/colaborador-unidad/colaborador-unidad.component';
import {FormsModule} from '@angular/forms';
import { UnidadComponent } from './componentes/unidad/unidad.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
    MatCardModule,
    MatCheckboxModule,
    MatInputModule, MatMenuModule, MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule, MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { FocusDirective } from './directivas/focus.directive';
import { FiltroColaboradorPipe } from './filtros/filtro-colaborador.pipe';

import {MatDialogModule} from '@angular/material/dialog';
import { ReporteComponent } from './componentes/reporte/reporte.component';
import { RutaReportePipe } from './pipe/ruta-reporte.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatExpansionModule} from '@angular/material/expansion';
import { HorasComponent } from './componentes/horas/horas.component';
import { InformacionColaboradorComponent } from './componentes/informacion-colaborador/informacion-colaborador.component';
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ColaboradorUnidadComponent, UnidadComponent, FocusDirective, FiltroColaboradorPipe,
    ReporteComponent, RutaReportePipe, HorasComponent, InformacionColaboradorComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule, MatDialogModule, MatMenuModule, MatCardModule, FontAwesomeModule, MatExpansionModule, MatChipsModule
    ],
  entryComponents: [ReporteComponent, InformacionColaboradorComponent]
})
export class DashboardModule { }
