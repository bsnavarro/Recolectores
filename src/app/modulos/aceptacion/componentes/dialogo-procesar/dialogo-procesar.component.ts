import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatListOption} from '@angular/material';
import {FacturaGasto} from '../../modelos/factura-gasto';
import {FacturaManual} from '../../modelos/factura-manual';
import Swal from 'sweetalert2';
import {AceptacionService} from '../../servicios/aceptacion.service';
import {ProcesoFactura} from '../../modelos/proceso-factura';

export interface Totales {
  total: number;
  impuesto: number;
}



@Component({
  selector: 'app-dialogo-procesar',
  templateUrl: './dialogo-procesar.component.html',
  styleUrls: ['./dialogo-procesar.component.css']
})
export class DialogoProcesarComponent  implements OnInit {
  public listaDocumentosGasto: FacturaGasto[];
  public listaDocumentosManual: FacturaManual[];

  constructor(public aceptacionService: AceptacionService, public referencia: MatDialogRef<DialogoProcesarComponent>, @Inject(MAT_DIALOG_DATA) public parametros) {

    this.listaDocumentosGasto = new Array<FacturaGasto>();
    this.listaDocumentosManual = new Array<FacturaManual>();
    this.obtenerReferencias(this.parametros.gasto, this.parametros.compra);
  }

  ngOnInit() {
  }

  getDocumentosManual(): FacturaManual[] {
    return this.listaDocumentosManual;
  }

  getDocumentosGasto(): FacturaGasto[] {
    return this.listaDocumentosGasto;
  }

  getTotalesGastos(): Totales {

    const sumaTotal = this.listaDocumentosGasto.reduce((suma, item) => {
      if (item.tipo === 'NotaCreditoElectronica') {
        return suma - item.totalFactura;
      }
      return suma + item.totalFactura;
    }, 0);

    const sumaImpuesto = this.listaDocumentosGasto.reduce((suma, item) => {
      if (item.tipo === 'NotaCreditoElectronica') {
        return suma - item.montoTotalImpuesto;
      }
      return suma + item.montoTotalImpuesto;
    }, 0);

    return {total: sumaTotal, impuesto: sumaImpuesto};
  }

  getTotalesCompras(): Totales {

    const sumaTotal = this.listaDocumentosManual.reduce((suma, item) => {
      if (item.tipo === 'NotaCreditoElectronica') {
        return suma - item.total;
      }
      return suma + item.total;
    }, 0);

    const sumaImpuesto = this.listaDocumentosManual.reduce((suma, item) => {
      if (item.tipo === 'NotaCreditoElectronica') {
        return suma - item.impuesto;
      }
      return suma + item.impuesto;
    }, 0);

    return {total: sumaTotal, impuesto: sumaImpuesto};
  }

  getDiferenciaTotales(): Totales {

    const diferenciaTotal = this.getTotalesGastos().total - this.getTotalesCompras().total;

    const diferenciaImpuesto = this.getTotalesGastos().impuesto - this.getTotalesCompras().impuesto;

    return {total: diferenciaTotal, impuesto: diferenciaImpuesto};
  }

  getTolerancia(): boolean {
    return this.getDiferenciaTotales().total <= 10 && this.getDiferenciaTotales().total >= -10 && this.getDiferenciaTotales().impuesto <= 10 && this.getDiferenciaTotales().impuesto >= -10;
  }

  getNumeroDocumentos(): boolean {
    return this.listaDocumentosGasto.length === this.listaDocumentosManual.length;
  }

  obtenerReferencias(gasto: string, compra: string): any {

    this.aceptacionService.obtenerReferencias(gasto, compra).subscribe(respuesta => {
      if (!respuesta || !respuesta.estado) {
        return Swal.fire({
          icon: 'warning',
          title: 'Facturas',
          text: respuesta.mensaje
        }).then(() => this.referencia.close());
      }

      this.listaDocumentosGasto = respuesta.data.bandeja as Array<FacturaGasto>;
      this.listaDocumentosManual = respuesta.data.manuales as Array<FacturaManual>;
    });
  }

  procesarListaDocumentos(): any {

    if (this.listaDocumentosGasto.length !== this.listaDocumentosManual.length) {
      return Swal.fire({
        icon: 'warning',
        title: 'Facturas',
        text: 'El número de documentos no corresponde'
      }).then(() => this.referencia.close());
    }

    const listaFacturasProcesar = [] as Array<ProcesoFactura>;
    let listaDocumentosBandeja = this.listaDocumentosGasto;

    for (const selecccion of this.listaDocumentosManual) {

      // Aqui hay que evaluar el # de factura tambien, ya no van a existir facturas sin # de factura o filtrar solo por consecutivo
      const relacion = listaDocumentosBandeja.filter((gasto: FacturaGasto) => gasto.tipo === selecccion.tipo && gasto.clave.match(selecccion.factura));

      if (relacion.length === 0) {
        continue;
      }

      const encontrada = relacion[0];

      listaFacturasProcesar.push({
        mensaje: 1,
        facturaBandeja: encontrada.consecutivo,
        facturaManual: selecccion.consecutivo,
        tipo: selecccion.tipo
      });

      listaDocumentosBandeja = listaDocumentosBandeja.filter((gasto: FacturaGasto) => gasto.consecutivo !== encontrada.consecutivo);
    }

    listaDocumentosBandeja.forEach(F => {
      listaFacturasProcesar.push({
        mensaje: 1,
        facturaBandeja: F.consecutivo,
        tipo: 'otraNotasElectronicas'
      });
    });

    this.aceptacionService.aceptarListaDocumentos(listaFacturasProcesar, this.parametros.departamento).subscribe(respuesta => {

      if (!respuesta.estado) {
        return Swal.fire({
          icon: respuesta.estado ? 'success' : 'error',
          title: 'Aceptar Factura',
          text: respuesta.mensaje
        });
      }

      return Swal.fire({
        icon: 'success',
        title: 'Aceptación',
        text: respuesta.mensaje
      }).then(() => this.referencia.close(true));
    });
  }


  confirmarRevisar(): any {

    return Swal.fire({
      title: '¿Esta seguro?',
      text: 'Enviar los documentos a revisión por el digitador?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#28a745'
    }).then((resultado) => {
      if (resultado.value) {
        this.revisarListaDocumentos();
      }
    });
  }

  confirmarProcesar(): any {

    return Swal.fire({
      title: '¿Esta seguro?',
      text: 'Desea procesar los documentos?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      cancelButtonColor: '#dc3545',
      confirmButtonColor: '#28a745'
    }).then((resultado) => {
      if (resultado.value) {
        this.procesarListaDocumentos();
      }
    });
  }

  revisarListaDocumentos(): any {

    // if (this.listaDocumentosGasto.length !== this.listaDocumentosManual.length) {
    //   return Swal.fire({
    //     icon: 'warning',
    //     title: 'Facturas',
    //     text: 'El número de documentos no corresponde'
    //   }).then(() => this.referencia.close());
    // }

    const listaFacturasProcesar = [] as Array<ProcesoFactura>;

    this.listaDocumentosManual.forEach(F => {
      listaFacturasProcesar.push({
        mensaje: 1,
        facturaManual: F.consecutivo
      });

      this.aceptacionService.revisarListaDocumentos(listaFacturasProcesar, this.parametros.departamento).subscribe(respuesta => {

        if (!respuesta.estado) {
          return Swal.fire({
            icon: respuesta.estado ? 'success' : 'error',
            title: 'Aceptar Factura',
            text: respuesta.mensaje
          });
        }

        return Swal.fire({
          icon: 'success',
          title: 'Aceptación',
          text: respuesta.mensaje
        }).then(() => this.referencia.close(true));
      });
    });
  }
}
