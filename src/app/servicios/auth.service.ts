import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Session} from '../modelos/session';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Respuesta} from '../modelos/respuesta';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    const token = AuthService.getToken();
    this.usuarioActivo = new BehaviorSubject<Session>(new JwtHelperService().decodeToken(token));
  }
  public usuarioActivo: BehaviorSubject<Session>;

  static getToken(): string {
    return localStorage.getItem('ID_SESION');
  }

  iniciarSession(datos: any): Observable<Respuesta> {

    const body = new HttpParams().set('usuario', datos.usuario).set('password', datos.password);

    return this.http.post<any>(environment.BackEndUrl + '/seguridad/autenticar', body.toString(),
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
      .pipe(map(respuesta => {

        if (respuesta.estado) {
          localStorage.setItem('ID_SESION', respuesta.data);
          this.usuarioActivo.next(new JwtHelperService().decodeToken(respuesta.data));
        }

        return respuesta;
      }), catchError(err => {
        this.mensaje(err.error);
        return err.error;
      }));
  }

  obtenerAcceso(parametros: any = {departamento: '', sistema: ''}): Observable<boolean> {
    const header = new HttpHeaders()
      .set('departamento', parametros.departamento ? parametros.departamento : '')
      .set('sistema', parametros.sistema ? parametros.sistema : '');

    return this.http.get<any>(environment.BackEndUrl + '/seguridad/refrescarToken', {headers: header}).pipe(map(respuesta => {

      if (respuesta.estado) {
        localStorage.setItem('ID_SESION', respuesta.data);
        this.usuarioActivo.next(new JwtHelperService().decodeToken(respuesta.data));
      }

      return respuesta.estado;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.ok;
    }));
  }

  desbloquear(datos: any): Observable<Respuesta> {

    const body = new HttpParams().set('usuario', datos.usuario).set('password', datos.password);
    const header = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('desbloquear', 'true');

    return this.http.post<any>(environment.BackEndUrl + '/seguridad/autenticar', body.toString(), {headers: header})
      .pipe(map(respuesta => {

        if (respuesta.estado) {
          localStorage.setItem('ID_SESION', respuesta.data);
          this.usuarioActivo.next(new JwtHelperService().decodeToken(respuesta.data));
        }

        return respuesta;
      }), catchError(err => {
        this.mensaje(err.error);
        return err.error;
      }));
  }

  actualizarCredenciales(datos: any): Observable<Respuesta> {

    const body = new HttpParams().set('usuario', datos.usuario)
                                 .set('password', datos.password)
                                 .set('passwordCambio', datos.passwordCambio);

    return this.http.post<any>(environment.BackEndUrl + '/seguridad/actualizarCredenciales', body.toString(),
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
      .pipe(map(respuesta => {

        if (respuesta.estado) {
          console.log('***');
        }

        return respuesta;
      }), catchError(err => {
        this.mensaje(err.error);
        return err.error;
      }));
  }

  cerrarSession(): Observable<boolean> {

    return this.http.get<any>(environment.BackEndUrl + '/seguridad/cerrarSesion').pipe(map(respuesta => {

      this.removeToken();
      return true;
    }));
  }

  removeToken(): void {
    localStorage.removeItem('ID_SESION');
    this.usuarioActivo.next(new Session());
  }

  isUserAuthenticated(): boolean {
    return AuthService.getToken() != null;
  }

  isLogueado(): boolean {
    return AuthService.getToken() != null;
  }

  mensaje(respuesta) {

    if (respuesta.type === "error") {
      //return Swal.fire({icon: 'error', title: 'ERROR', text: '!Ocurrió un error!'});
    }

    if (!respuesta.estado) {
      if (respuesta.tipo == 1 || respuesta.tipo == 0) {
        Swal.fire({icon: 'warning', title: 'Acceso', text: respuesta.mensaje});
      }
      if (respuesta.tipo == 2) {
        Swal.fire({icon: 'error', title: 'Acceso', text: respuesta.mensaje});
      }
    } else {
      Swal.fire({icon: 'success', text: respuesta.mensaje, showConfirmButton: false, timer: 1500})
    }
  }

}
