import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Respuesta} from '../../../modelos/respuesta';
import {environment} from '../../../../environments/environment';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonasrService {
  public prefijo: string;

  constructor(private http: HttpClient) {
    this.prefijo = '/personasR/';
  }

  obtenerListaRecolectores(): Observable<Respuesta> {
    return this.http.get<any>(environment.BackEndUrl + this.prefijo
      + 'obtenerListaRecolectores').pipe(first(respuesta => {
      return respuesta;
    }));
  }
}
