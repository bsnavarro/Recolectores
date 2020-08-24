import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, first} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

import {Respuesta} from '../../../modelos/respuesta';
import Swal from "sweetalert2";
import {PersonaRelacionFolioTipo} from "../modelos/PersonaRelacionFolioTipo";
import {PersonaRelacionFolio} from "../modelos/PersonaRelacionFolio";
import {Persona} from "../modelos/persona";
import {PersonaAuditoria} from "../modelos/PersonaAuditoria";
import {PersonaTributacion} from "../modelos/PersonaTributacion";

@Injectable({
  providedIn: 'root'
})
export class PersonaRelacionFolioService {
  public listaPersonaRelacionFolioTipo: BehaviorSubject<PersonaRelacionFolioTipo[]>;

  constructor(private http: HttpClient) {
    this.listaPersonaRelacionFolioTipo = new BehaviorSubject<PersonaRelacionFolioTipo[]>(new Array<PersonaRelacionFolioTipo>());
  }

  listaTiposRelacion(): Observable<Respuesta> {
    return this.http.get<any>(environment.BackEndUrl + '/personaRelacionFolio/listaTiposRelacion').pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      this.listaPersonaRelacionFolioTipo.next(respuesta.data);
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  guardarPersonaRelacionFolio(personaRelacionFolio: PersonaRelacionFolio, editar: boolean): Observable<Respuesta> {
    const headers = {editar: editar ? "true" : "false"};
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/guardarPersonaRelacionFolio', personaRelacionFolio, {headers}).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  auditoriaPersona(persona: Persona): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/auditoriaPersona', persona).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  listaFormulario(persona: Persona): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/listaFormulario', persona).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  generarReporte(idFormulario: number, idTipoFormulario: string): Observable<Respuesta> {
    const headers = {idFormulario: idFormulario.toString(), idTipoFormulario: idTipoFormulario};
    return this.http.get<any>(environment.BackEndUrl + '/personaRelacionFolio/generarReporte', {headers}).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  auditoriaActualizar(persona: PersonaAuditoria): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/auditoriaActualizar', persona).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }


  modificar(personaRelacionFolio: PersonaRelacionFolio): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/modificar', personaRelacionFolio).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }


  desinscribir(personaRelacionFolio: PersonaRelacionFolio): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/desinscribir', personaRelacionFolio).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  crearFolioFamiliar(persona: Persona): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/crearFolioFamiliar', persona).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  consultarMH(persona: Persona): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/consultarMH', persona).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  inscribir(persona: Persona): Observable<Respuesta> {
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/inscribir', persona).pipe(first(respuesta => {
      if (!respuesta.estado) {
        this.mensaje(respuesta)
      }
      return respuesta;
    }), catchError(err => {
      this.mensaje(err.error);
      return err.error;
    }));
  }

  cambioNucleo(personaRelacionFolio: PersonaRelacionFolio, idNuevo: string, tipoNuevo: string, motivo: string): Observable<Respuesta> {
    const headers = {idNuevo: idNuevo, tipoNuevo: tipoNuevo, motivo: motivo};
    return this.http.post<any>(environment.BackEndUrl + '/personaRelacionFolio/cambioNucleo', personaRelacionFolio, {headers}).pipe(first(respuesta => {
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
