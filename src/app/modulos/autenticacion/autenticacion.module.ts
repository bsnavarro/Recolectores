import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutenticacionComponent} from './autenticacion.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatSelectModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';

import {TopNavComponent} from './componentes/top-nav/top-nav.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ResetPasswordComponent } from './componentes/reset-password/reset-password.component';

@NgModule({
  declarations: [AutenticacionComponent, TopNavComponent, ResetPasswordComponent],
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
    MatToolbarModule
  ],
  entryComponents: [ResetPasswordComponent]
})

export class AutenticacionModule { }
