import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, first, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Usuario} from '../../../modelos/usuario';
import Swal from "sweetalert2";



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public listaUsuarios: BehaviorSubject<Usuario[]>;
  constructor(private http: HttpClient) {
    this.listaUsuarios = new BehaviorSubject<Usuario[]>(new Array<Usuario>());
  }

  obtenerUsuarios(parametros: any): Observable<boolean> {

    const header = new HttpHeaders()
      .set('departamento', parametros);

    return this.http.get<any>(environment.BackEndUrl + '/permisos/obtenerUsuarios', {headers: header}).pipe(first(respuesta => {
      if (respuesta.estado) {
        this.listaUsuarios.next(respuesta.data);
      }
      return respuesta.estado;
    }), catchError(err => {
      this.mensaje(err.error);
      if (err.error.estado) {
        this.listaUsuarios.next(err.error.data);
      }
      return err.error.estado;
    }));
  }

  agregarUsuario(usuario: Usuario, parametros: any): Observable<boolean> {

    const header = new HttpHeaders()
      .set('departamento', parametros);

    return this.http.post<any>(environment.BackEndUrl + '/permisos/agregarUsuario', usuario, {headers: header}).pipe(first(respuesta => {
      // if (respuesta.estado) {
      //   this.listaUsuarios.next(respuesta.data);
      // }
      return respuesta.estado;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error.estado;
    }));
  }

  mensaje(respuesta) {

    if (respuesta.type === "error") {
      return Swal.fire({icon: 'error', title: 'ERROR', text: '!Ocurrió un error!'});
    }

    if (!respuesta.estado) {
      if (respuesta.tipo == 1 || respuesta.tipo == 0) {
        Swal.fire({icon: 'warning', title: 'Usuarios', text: respuesta.mensaje});
      }
      if (respuesta.tipo == 2) {
        Swal.fire({icon: 'error', title: 'Usuarios', text: respuesta.mensaje});
      }
    } else {
      Swal.fire({icon: 'success', text: respuesta.mensaje, showConfirmButton: false, timer: 1500})
    }
  }

}
