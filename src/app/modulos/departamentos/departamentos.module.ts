import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DepartamentosComponent} from './departamentos.component';
import {AppRoutingModule} from './app-routing.module';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TopNavComponent} from './componentes/top-nav/top-nav.component';

@NgModule({
  declarations: [DepartamentosComponent, TopNavComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatButtonToggleModule,
    MatMenuModule,
  ]
})
export class DepartamentosModule { }
