import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import Swal from "sweetalert2";
import {Respuesta} from "../../../modelos/respuesta";

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  public moduloBehaviorSubject: BehaviorSubject<Respuesta>;

  constructor(private http: HttpClient) {
    this.moduloBehaviorSubject = new BehaviorSubject<Respuesta>(new Respuesta());
  }

  obtenerModulos(parametros: any = {departamento: '', sistema: ''}): Observable<boolean> {

    const header = new HttpHeaders()
      .set('departamento', parametros.departamento ? parametros.departamento : '')
      .set('sistema', parametros.sistema ? parametros.sistema : '');

    return this.http.get<any>(environment.BackEndUrl + '/modulo/obtenerModulos', {headers: header}).pipe(map(respuesta => {
      this.moduloBehaviorSubject.next(respuesta);
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.ok;
    }));
  }

  mensaje(respuesta) {

    if (respuesta.type === "error") {
      return Swal.fire({icon: 'error', title: 'ERROR', text: '!Ocurrió un error!'});
    }

    if (!respuesta.estado) {
      if (respuesta.tipo == 1 || respuesta.tipo == 0) {
        Swal.fire({icon: 'warning', title: 'Modulo', text: respuesta.mensaje});
      }
      if (respuesta.tipo == 2) {
        Swal.fire({icon: 'error', title: 'Modulo', text: respuesta.mensaje});
      }
    } else {
      Swal.fire({icon: 'success', text: respuesta.mensaje, showConfirmButton: false, timer: 1500})
    }
  }

}
