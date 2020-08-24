import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {
  private prefix: string;
  constructor(private http: HttpClient) {
    this.prefix = '/planilla';
  }

  public obtenerParametro(): Observable<HttpResponse<any>> {
    return this.http.get(environment.BackEndUrl + this.prefix + '/obtenerParametro', {
      observe: 'response',
      reportProgress: true
    }) as Observable<HttpResponse<any>>;
  }

}
