import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadEncargadoService {
  private prefix: string;

  constructor(private http: HttpClient) {
    this.prefix = '/unidadEncargado';
  }

  public obtenerUnidadesEncargado(): Observable<HttpResponse<any>>{
    return this.http.get(environment.BackEndUrl + this.prefix + '/obtenerUnidadPorEncargado', {
      observe: 'response',
      reportProgress: true
    }) as Observable<HttpResponse<any>>;
  }

  public obtenerDepartamento(departamento: string): Observable<HttpResponse<any>> {
    const encabezado = new HttpHeaders().set('departamento', departamento);

    return this.http.get(environment.BackEndUrl +  this.prefix + '/obtenerDepartamento', {
      observe: 'response',
      reportProgress: true,
      headers: encabezado
    }) as Observable<HttpResponse<any>>;
  }
}
