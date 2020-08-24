import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

import {ParametroPlanilla} from '../modelos/ParametroPlanilla';
import {Planilla} from '../modelos/Planilla';
import {Respuesta} from '../../../modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private prefix: string;
  constructor(private http: HttpClient) {
    this.prefix = '/parametroPlanilla';
  }

  public obtenerTiposPlanilla(): Observable<HttpResponse<any>> {
    return this.http.get(environment.BackEndUrl + this.prefix + '/obtenerTiposPlanilla', {
      observe: 'response',
      reportProgress: true
    }) as Observable<HttpResponse<any>>;
  }

  public actualizarEstadoPlanilla(planillaList: Planilla[]): Observable<Respuesta> {
    return this.http.post(environment.BackEndUrl + this.prefix + '/actualizarEstadoPlanilla', planillaList) as Observable<Respuesta>;
  }

  public actualizarEstadoUnidad(parametro: ParametroPlanilla): Observable<Respuesta>  {
    return this.http.post(environment.BackEndUrl + this.prefix + '/actualizarEstadoUnidad', parametro) as Observable<Respuesta>;
  }

  public obtenerParametroPlanilla(tipoPlanilla: string, periodo: string): Observable<HttpResponse<any>> {
    let encabezado = new HttpHeaders().set('tipoPlanilla', tipoPlanilla);
    encabezado = encabezado.append('periodo', periodo);

    return this.http.get(environment.BackEndUrl +  this.prefix + '/obtenerParametroPlanilla', {
      observe: 'response',
      reportProgress: true,
      headers: encabezado
    }) as Observable<HttpResponse<any>>;
  }
}
