import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SeguridadComponent} from './seguridad.component';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SeguridadComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class SeguridadModule { }
