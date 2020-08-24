import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../../modelos/respuesta';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {first} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Finca} from '../modelos/Finca';

@Injectable({
  providedIn: 'root'
})

export class FincasService {
  public prefijo: string;

  constructor(private http: HttpClient) {
    this.prefijo = '/fincas/';
  }

  obtenerListaFincas(): Observable<Respuesta> {
    return this.http.get<any>(environment.BackEndUrl + this.prefijo
      + 'obtenerFincas').pipe(first(respuesta => {
      return respuesta;
    }));
  }

  obtenerListaFincasProductor(identificacion: string): Observable<Respuesta> {
    return this.http.get<any>(environment.BackEndUrl + this.prefijo
      + 'obtenerFincasProductor?' + 'identificacion=' + identificacion).pipe(first(respuesta => {
      return respuesta;
    }));
  }

  crearModificarFinca(finca: Finca): Observable<Respuesta> {
    const header = new HttpHeaders();
    return this.http.post<any>(environment.BackEndUrl + this.prefijo + 'crearModificarFinca',
      finca, {headers: header})
      .pipe(first(respuesta => {
        return respuesta;
      }));
  }
}
