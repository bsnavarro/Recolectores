import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroPlanillaService {
  private prefix: string;
  constructor(private http: HttpClient) {
    this.prefix = '/parametroPlanilla';
  }
  public obtenerParametroUnidad(tipoPlanilla: string, periodo: string, codigoDepartamento: string, codigoUnidad: string): Observable<HttpResponse<any>> {
    let encabezado = new HttpHeaders().set('tipoPlanilla', tipoPlanilla);
    encabezado = encabezado.append('periodo', periodo);
    encabezado = encabezado.append('codigoDepartamento', codigoDepartamento);
    encabezado = encabezado.append('codigoUnidad', codigoUnidad);

    return this.http.get(environment.BackEndUrl +  this.prefix + '/obtenerParametroUnidad', {
      observe: 'response',
      reportProgress: true,
      headers: encabezado
    }) as Observable<HttpResponse<any>>;
  }
}
