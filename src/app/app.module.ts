import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './auxiliares/jwt.interceptor';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LoadingScreenInterceptor} from './auxiliares/loading.interceptor';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {RecolectoresModule} from './modulos/recolectores/recolectores.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RecolectoresModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '10px',
      primaryColour: '#269148',
      secondaryColour: '#269148',
      tertiaryColour: '#269148'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
