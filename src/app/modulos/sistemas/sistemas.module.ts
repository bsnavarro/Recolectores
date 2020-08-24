import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SistemasComponent} from './sistemas.component';
import {AppRoutingModule} from './app-routing.module';
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
import {MatExpansionModule} from "@angular/material/expansion";
import { ListaModulosComponent } from './componentes/lista-modulos/lista-modulos.component';

@NgModule({
  declarations: [SistemasComponent, TopNavComponent, ListaModulosComponent],
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
        MatCardModule
    ]
})
export class SistemasModule { }
