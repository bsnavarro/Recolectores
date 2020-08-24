import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Respuesta} from "../../../modelos/respuesta";
import {environment} from "../../../../environments/environment";
import {catchError, first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {PersonaTributacion} from "../modelos/PersonaTributacion";
import {PersonaRelacionFolioTipo} from "../modelos/PersonaRelacionFolioTipo";
import {Persona} from "../modelos/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public personaBehaviorSubject: BehaviorSubject<Respuesta>;

  constructor(private http: HttpClient) {
    this.personaBehaviorSubject = new BehaviorSubject<Respuesta>(new Respuesta());
  }

  buscarPersona(id: string = '', tipo: string = ''): Observable<Respuesta> {
    let s = environment.BackEndUrl + '/persona/buscar?id=' + id;

    if (tipo != '') {
      s += '&tipo=' + tipo;
    }

    return this.http.get<any>(s).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      if (tipo == '') {
        this.personaBehaviorSubject.next(respuesta);
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  actualizarPersonaTributacion(personaTributacion: PersonaTributacion): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/persona/actualizarPersonaTributacion', personaTributacion).pipe(first(respuesta => {
      this.mensaje(respuesta);
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  mensaje(respuesta) {

    if (respuesta.type === "error") {
      return Swal.fire({icon: 'error', title: 'ERROR', text: '!Ocurrió un error!'});
    }

    if (!respuesta.estado) {
      if (respuesta.tipo == 1 || respuesta.tipo == 0) {
        Swal.fire({icon: 'warning', title: 'Personas', text: respuesta.mensaje});
      }
      if (respuesta.tipo == 2) {
        Swal.fire({icon: 'error', title: 'Personas', text: respuesta.mensaje});
      }
    } else {
      Swal.fire({icon: 'success', text: respuesta.mensaje, showConfirmButton: false, timer: 1500})
    }
  }
}
