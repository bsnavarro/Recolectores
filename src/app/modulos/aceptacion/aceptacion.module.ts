import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AceptacionComponent} from './aceptacion.component';
import {AppRoutingModule} from './app-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule,
  MatNativeDateModule, MatSelectModule, MatTableModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogoProcesarComponent } from './componentes/dialogo-procesar/dialogo-procesar.component';
import {FilterPipe} from './auxiliares/filter.pipe';

@NgModule({
  declarations: [AceptacionComponent, DialogoProcesarComponent, FilterPipe],
  entryComponents: [AceptacionComponent, DialogoProcesarComponent],
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
  ]
})
export class AceptacionModule { }
