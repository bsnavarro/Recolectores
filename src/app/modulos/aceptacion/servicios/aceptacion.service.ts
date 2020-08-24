import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, first, map, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {FacturaGasto} from '../modelos/factura-gasto';
import {FacturaManual} from '../modelos/factura-manual';
import {Departamento} from '../modelos/departamento';
import {Respuesta} from '../../../modelos/respuesta';
import {FiltroDocumentos} from '../modelos/filtro-documentos';
import {ProcesoFactura} from '../modelos/proceso-factura';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AceptacionService {
  public listaFacturasBandeja: BehaviorSubject<FacturaGasto[]>;
  public listaFacturasManuales: BehaviorSubject<FacturaManual[]>;
  public listaDepartamentos: BehaviorSubject<Departamento[]>;
  constructor(private http: HttpClient) {
    this.listaFacturasBandeja = new BehaviorSubject<FacturaGasto[]>(new Array<FacturaGasto>());
    this.listaFacturasManuales = new BehaviorSubject<FacturaManual[]>(new Array<FacturaManual>());
    this.listaDepartamentos = new BehaviorSubject<Departamento[]>(new Array<Departamento>());
  }

  obtenerFacturasGasto(parametros: FiltroDocumentos): void {

    this.listaFacturasBandeja.next([]);
    this.listaFacturasManuales.next([]);

    const consulta =
      (parametros.tipo ? 'tipo=' + parametros.tipo : '') +
      (parametros.estado ? '&estado=' + parametros.estado : '') +
      (parametros.desde ? '&desde=' + parametros.desde : '') +
      (parametros.hasta ? '&hasta=' + parametros.hasta : '') +
      (parametros.departamento ? '&departamento=' + parametros.departamento : '') +
      (parametros.proveedor ? '&proveedor=' + parametros.proveedor : '');
      this.http.get<any>(environment.BackEndUrl + '/aceptacion/obtenerDocumentos?' + consulta).subscribe((respuesta) => {

      if (!respuesta.estado) {
        return Swal.fire({
          icon: 'warning',
          title: 'Facturas',
          text: 'No se pudo obtener la lista de facturas'
        });
      }

      const datos = respuesta.data;
      const bandeja = datos.bandeja;
      const manuales = datos.manuales;

      if ((!bandeja || bandeja.length === 0) && (!manuales || manuales.length === 0)) {
        return Swal.fire({
          icon: 'info',
          title: 'Facturas',
          text: 'No se encontraron documentos con los parametros seleccionados'
        }).then(() => respuesta.estado);
      }

      this.listaFacturasBandeja.next(bandeja);
      this.listaFacturasManuales.next(manuales);
    });
  }

  obtenerReferencias(consecutivoGasto: string, consecutivoCompra: string): Observable<Respuesta> {
    return this.http.get<any>(environment.BackEndUrl + '/aceptacion/obtenerReferencias?' + 'gasto=' + consecutivoGasto + '&compra=' + consecutivoCompra).pipe(first((respuesta) => {
      return respuesta;
    }), catchError(err => {
      return err.error;
    }));
  }

  obtenerDepartamentos(): Observable<boolean> {
    return this.http.get<any>(environment.BackEndUrl + '/seguridad/traerDepartamentos').pipe(first(respuesta => {
      if (respuesta.estado) {
        this.listaDepartamentos.next(respuesta.data);
      }
      return respuesta.estado;
    }), catchError(err => {
      if (err.error.estado) {
        this.listaDepartamentos.next(err.error.data);
      }
      return err.error;
    }));
  }

  buscarProveedor(id: string = ''): Observable<Respuesta> {
    return this.http.get<any>(environment.BackEndUrl + '/aceptacion/buscarProveedor?id=' + id).pipe(first(respuesta => {
      return respuesta;
    }), catchError(err => {
      return err.error;
    }));
  }

  procesarDocumento(procesar: ProcesoFactura): Observable<Respuesta> {

    return this.http.post<any>(environment.BackEndUrl + '/aceptacion/procesarDocumento', procesar).pipe(first(respuesta => {
      return respuesta;
    }), catchError(err => {
      return err.error;
    }));
  }

  descartarListaDocumentos(listaFacturas: ProcesoFactura[]): Observable<Respuesta> {

    return this.http.post<any>(environment.BackEndUrl + '/aceptacion/descartarListaDocumentos', listaFacturas).pipe(first(respuesta => {
      return respuesta;
    }), catchError(err => {
      return err.error;
    }));
  }

  aceptarListaDocumentos(listaFacturas: ProcesoFactura[], departamento: number): Observable<Respuesta> {

    return this.http.post<any>(environment.BackEndUrl + '/aceptacion/aceptarListaDocumentos?departamento=' + departamento, listaFacturas).pipe(first(respuesta => {
      return respuesta;
    }), catchError(err => {
      return err.error;
    }));
  }

  revisarListaDocumentos(listaFacturas: ProcesoFactura[], departamento: number): Observable<Respuesta> {

    return this.http.post<any>(environment.BackEndUrl + '/aceptacion/revisarListaDocumentos?departamento=' + departamento, listaFacturas).pipe(first(respuesta => {
      return respuesta;
    }));
  }

  referenciasPendientes(consecutivoGasto: string, consecutivoCompra: string): Observable<boolean> {
    return this.http.get<any>(environment.BackEndUrl + '/aceptacion/listaReferenciasPendientes?' + 'gasto=' + consecutivoGasto + '&compra=' + consecutivoCompra).pipe(first(respuesta => {
      if (!respuesta.estado) {
        Swal.fire({
          icon: 'warning',
          title: 'Facturas',
          text: respuesta.mensaje
        }).then(() => respuesta.estado);
      }

      return respuesta.estado;
    }), catchError(err => {
      if (!err.error.estado) {
        Swal.fire({
          icon: 'warning',
          title: 'Facturas',
          text: err.error.mensaje
        }).then(() => err.error.estado);
      }

      return err.error.estado;
    }));
  }
}
