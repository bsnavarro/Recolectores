import {Component, OnInit, ViewChild} from '@angular/core';
import {ParametrosService} from '../../servicios/parametros.service';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {FormControl, NgForm} from '@angular/forms';
import {ParametroPlanilla} from '../../modelos/ParametroPlanilla';
import {Planilla} from '../../modelos/Planilla';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatosModulo} from '../../../sistemas/modelos/DatosModulo';
import {Session} from '../../../../modelos/session';
import {Permisos} from '../../../horas-planilla/permisos/permisos.enum';
import {NavService} from '../../../sistemas/servicios/nav-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../servicios/auth.service';

@Component({
  selector: 'app-activacion',
  templateUrl: './activacion.component.html',
  styleUrls: ['./activacion.component.css']
})
export class ActivacionComponent implements OnInit {

  constructor(private parametrosService: ParametrosService,
              private navService: NavService,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }
  // public bigInt = BigInt;
  private usuario: Session;
  public permisos = Permisos;
  public datosModulo: DatosModulo;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  planillaList: Planilla[];
  planillaSeleccionada = new FormControl();
  unidadesPorPlanilla: ParametroPlanilla[];
  planillaActualizarList: Planilla[];
  planilla: Planilla;

  dataSource: MatTableDataSource<ParametroPlanilla>;
  displayedColumns = ['descripcionDepartamento', 'descripcionUnidad' , 'activo'];

  ngOnInit() {
    this.datosModulo = new DatosModulo();

    this.datosModulo.mostrarMenu = true;
    this.datosModulo.navItems = [];
    this.navService.datosModulo.next(this.datosModulo);
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);

    this.navService.parametro.subscribe((parametro: any) => {
      this.datosModulo.nombreModulo = 'Modulo parametros planilla ';
      this.navService.datosModulo.next(this.datosModulo);
    });

    this.unidadesPorPlanilla = [];

    this.cargarPlanillaActual();
  }

  cargarPlanillaActual(): void {
    // tslint:disable-next-line:max-line-length

    this.parametrosService.obtenerTiposPlanilla()
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

  obtenerUnidades(): void {
    // tslint:disable-next-line:max-line-length
    this.unidadesPorPlanilla.length = 0;
    this.dataSource = new MatTableDataSource(this.unidadesPorPlanilla);
    this.parametrosService.obtenerParametroPlanilla(this.planillaSeleccionada.value.tipoPlanilla.toString(),
      this.planillaSeleccionada.value.periodo.toString())
      .subscribe(
        response => {
          if (response.status === 200) {
            if (response.body.estado) {
              this.unidadesPorPlanilla = response.body.data;
              this.dataSource = new MatTableDataSource(this.unidadesPorPlanilla);
              this.dataSource.paginator = this.paginator;
            }
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

  public actualizarEstadoPlanilla(form: NgForm): void {
    if (!form.valid) {
      this.mostrarMensaje2('Datos inválidos');
    }

    this.planillaActualizarList = [];
    this.planillaActualizarList.push(this.planillaSeleccionada.value);

    this.parametrosService.actualizarEstadoPlanilla(this.planillaActualizarList)
      .subscribe(respuesta => {
          if (respuesta.estado) {
            this.mostrarMensaje2(respuesta.mensaje);
          } else {
            this.mostrarMensaje2( respuesta.mensaje);
          }
        },
        err => {
          console.log(err);
          this.mostrarMensaje2('Ha ocurrido un error al actualizar el estado de las unidades de la planilla');
        },
        () => {
          this.obtenerUnidades();
        }
      );
  }

  public actualizarEstadoUnidad(parametroPlanilla: ParametroPlanilla): void {
  //  parametroPlanilla.activo = !parametroPlanilla.activo;
    this.parametrosService.actualizarEstadoUnidad(parametroPlanilla)
      .subscribe(respuesta => {
        if (respuesta.estado) {
          this.snackBar.open(respuesta.mensaje, 'Aceptar', {
            duration: 2000,
            direction: 'rtl'
          });
        } else {
          this.mostrarMensaje2( respuesta.mensaje);
        }

      },
        err => {
          console.log(err);
          this.mostrarMensaje2('Ha ocurrido un error al actualizar el estado de la unidad');
        },
        () => {
          this.obtenerUnidades();
        }
      );
  }
    mostrarMensaje2(mensaje: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: mensaje
    });
  }

}
