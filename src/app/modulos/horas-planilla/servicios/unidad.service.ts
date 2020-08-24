import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private prefix: string;
  constructor(private http: HttpClient) {
    this.prefix = '/seguridad';
  }

  public traerDepartamentos(): Observable<HttpResponse<any>> {
    return this.http.get(environment.BackEndUrl + this.prefix + '/traerDepartamentos', {
      observe: 'response',
      reportProgress: true
    }) as Observable<HttpResponse<any>>;
  }


}
