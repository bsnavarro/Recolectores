import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';
import {ColaboradorUnidad} from '../modelos/ColaboradorUnidad';
import {Respuesta} from '../../../modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private prefix: string;
  constructor(private http: HttpClient) {
    this.prefix = '/colaborador';
  }

  public obtenerPlanillaUnidad(departamento: string, unidad: string): Observable<HttpResponse<any>>{
    let encabezado = new HttpHeaders().set('departamento', departamento);
    encabezado = encabezado.append('unidad', unidad);

    return this.http.get(environment.BackEndUrl + this.prefix + '/obtenerPlanillaUnidad', {
      observe: 'response',
      reportProgress: true,
      headers: encabezado
    }) as Observable<HttpResponse<any>>;
  }

  public obtenerColaboradorUnidad(tipoPlanilla: string, periodo: string, departamento: string, unidad: string): Observable<HttpResponse<any>>{
    let encabezado = new HttpHeaders().set('tipoPlanilla', tipoPlanilla);
    encabezado = encabezado.append('periodo', periodo);
    encabezado = encabezado.append('departamento', departamento);
    encabezado = encabezado.append('unidad', unidad);

    return this.http.get(environment.BackEndUrl + this.prefix + '/obtenerColaboradorUnidad', {
      observe: 'response',
      reportProgress: true,
      headers: encabezado
    }) as Observable<HttpResponse<any>>;
  }

  public actualizarHora(colaboradorUnidad: ColaboradorUnidad): Observable<Respuesta> {
    return this.http.post(environment.BackEndUrl + this.prefix + '/actualizarHora', colaboradorUnidad) as Observable<Respuesta>;
  }
}
