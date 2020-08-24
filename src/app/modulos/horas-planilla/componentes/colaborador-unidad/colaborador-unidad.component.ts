import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Respuesta} from '../../../../modelos/respuesta';

import {EncargadoUnidad} from '../../modelos/encargadoUnidad';
import {ColaboradorService} from '../../servicios/colaborador.service';
import {Departamento} from '../../modelos/departamento';
import {Session} from '../../../../modelos/session';
import {AuthService} from '../../../../servicios/auth.service';
import {NavService} from '../../../sistemas/servicios/nav-service';
import {DatosModulo} from '../../../sistemas/modelos/DatosModulo';
import {Planilla} from '../../modelos/Planilla';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {UnidadEncargadoService} from '../../servicios/unidad-encargado.service';


@Component({
  selector: 'app-colaborador-unidad',
  templateUrl: './colaborador-unidad.component.html',
  styleUrls: ['./colaborador-unidad.component.css']
})
export class ColaboradorUnidadComponent implements OnInit {
  private usuario: Session;
  public datosModulo: DatosModulo;

  // tslint:disable-next-line:max-line-length
  constructor( private colaboradorService: ColaboradorService, private snackBar: MatSnackBar,
               private unidadEncargadoService: UnidadEncargadoService,
               private authService: AuthService, private navService: NavService) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
    this.navService.parametro.subscribe((parametro: any) => parametro ?  this.cargarInformacionDepartamento(parametro.param) : false);
  }

  @Input() events: Observable<void>;

  respuesta: Respuesta;
  departamentoInformacion: Departamento;

  private unidadSeleccionada: EncargadoUnidad;
  planillaList: Planilla[];

  ngOnInit() {
  }

  cargarInformacionDepartamento(unidadSeleccionada: EncargadoUnidad): void {
    this.unidadSeleccionada = unidadSeleccionada;
    this.unidadEncargadoService.obtenerDepartamento(this.unidadSeleccionada.codigoDepartamento.toString()).subscribe(
      response => {
        if (response.status === 200) {
          if (response.body.estado) {
            this.departamentoInformacion = response.body.data;
            this.cargarPlanillaUnidad();
          } else {
            this.mostrarMensaje2(response.body.mensaje);
          }
        } else {
          this.mostrarMensaje2('Ha ocurrido un 1error');
        }
      },
      err => {
        console.log(err);
        this.mostrarMensaje2('Ha ocurrido un 2error');
      },
      () => {

      }
    );
  }

  cargarPlanillaUnidad(): void {
    // tslint:disable-next-line:max-line-length
    this.colaboradorService.obtenerPlanillaUnidad(this.unidadSeleccionada.codigoDepartamento.toString(), this.unidadSeleccionada.codigoUnidad.toString())
      .subscribe(
      response => {
        if (response.status === 200) {
          if (response.body.estado) {
            this.planillaList = response.body.data;
          } else {
            this.mostrarMensaje2(response.body.mensaje);
          }
        } else {
          this.mostrarMensaje2('error al consultar las planillas');
        }
      },
      err => {
        console.log(err);
        this.mostrarMensaje2('Ha ocurrido un 2error');
      },
      () => {
      }
    );
  }

   mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'ACEPTAR', {
      duration: 2000,
    });
  }

  mostrarMensaje2(mensaje: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: mensaje
    });
  }
}
