import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosPlanillaRoutingModule } from './parametros-planilla-routing.module';
import { ActivacionComponent } from './componentes/activacion/activacion.component';
import {
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ActivacionComponent],
    imports: [
        CommonModule,
        ParametrosPlanillaRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
       MatSnackBarModule
    ]
})
export class ParametrosPlanillaModule { }
