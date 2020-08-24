import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonasComponent} from './personas.component';
import {AppRoutingModule} from './app-routing.module';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortByPipe} from "./auxiliares/SortByPipe";
import {RelacionFolioComponent} from './componentes/tabs/relacion-folio/relacion-folio.component';
import {CorreoComponent} from './componentes/tabs/correo/correo.component';
import {ModalFormulariosComponent} from './componentes/modal/modal-formularios/modal-formularios.component';


import {NgbAlertModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TributacionComponent} from './componentes/tabs/tributacion/tributacion.component';
import { ModalCambioNucleoComponent } from './componentes/modal/modal-cambio-nucleo/modal-cambio-nucleo.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { DatosGeneralesComponent } from './componentes/tabs/datos-generales/datos-generales.component';

@NgModule({
  declarations: [PersonasComponent, SortByPipe, RelacionFolioComponent, CorreoComponent, ModalFormulariosComponent, TributacionComponent, ModalCambioNucleoComponent, DatosGeneralesComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatBadgeModule,
    MatToolbarModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbTooltipModule
  ],
  providers: [SortByPipe],
  entryComponents: [ModalFormulariosComponent, ModalCambioNucleoComponent]
})
export class PersonasModule {
}
