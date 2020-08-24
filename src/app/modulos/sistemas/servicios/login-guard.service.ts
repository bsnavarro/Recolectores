import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../../../servicios/auth.service';
import {first, map, pluck} from 'rxjs/operators';
import {Respuesta} from '../modelos/respuesta';
import {Session} from '../../../modelos/session';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  private usuario: Session;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {


    if (!this.authService.isLogueado()) {
      this.router.navigate(['/autenticacion']);
      return false;
    }

    const departamento = route.parent.paramMap.get('departamento');
    const sistema = route.paramMap.get('sistema');

    return this.authService.obtenerAcceso({departamento, sistema}).pipe(map(respuesta => {

      if ((sistema && !this.usuario.mascara) || this.usuario.mascara === "0") {
        this.mensaje({estado: false, tipo: 1, mensaje: 'El usuario no tiene permiso para ingresar al módulo' });
        this.router.navigate(['/departamento', 1]);
        // this.activatedRoute.params.subscribe(params => {
        //    params['departamento'];
        // });
        return false;
      }

      return respuesta;
    }));
  }

  mensaje(respuesta) {

    if (respuesta.type === "error") {
      return Swal.fire({icon: 'error', title: 'ERROR', text: '!Ocurrió un error!'});
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
