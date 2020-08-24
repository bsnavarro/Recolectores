import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

import {EncargadoUnidad} from '../../modelos/encargadoUnidad';
import {Planilla} from '../../modelos/Planilla';
import {ColaboradorUnidad} from '../../modelos/colaboradorUnidad';
import {ColaboradorService} from '../../servicios/colaborador.service';
import {MatTableDataSource} from '@angular/material/table';
import {ReporteComponent} from '../reporte/reporte.component';
import {Session} from '../../../../modelos/session';
import {MatDialog} from '@angular/material/dialog';
import {MatInput} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {AuthService} from '../../../../servicios/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InformacionColaboradorComponent} from '../informacion-colaborador/informacion-colaborador.component';
import {environment} from '../../../../../environments/environment';
import {EncargadoDepartamento} from '../../modelos/encargadoDepartamento';
import {ParametroPlanillaService} from '../../servicios/parametro-planilla.service';
import {ParametroPlanilla} from '../../modelos/ParametroPlanilla';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css']
})
export class HorasComponent implements OnInit {
  @Input() unidadSeleccionada: EncargadoUnidad;
  @Input() planilla: Planilla;
  @Input() departamentoInformacion: EncargadoDepartamento;

  @ViewChildren(MatInput, {read: ElementRef}) inputs: QueryList<ElementRef>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  colaboradores: ColaboradorUnidad[];
  dataSource: MatTableDataSource<ColaboradorUnidad>;
  private usuario: Session;
  private ruta: string;
  public filaEditar: number;

  displayedColumns = ['identificacion', 'nombreCompleto',
    'horasD', 'horasAjusteD', 'horasExtraD', 'horasDobleD',
    'horasM', 'horasAjusteM', 'horasExtraM', 'horasDobleM',
    'horasN', 'horasAjusteN', 'horasExtraN', 'horasDobleN',
    'totalColaborador1', 'totalColaboradorE', 'totalColaboradorD'];

  /*TOTALES*/
  totalHorasD: number;
  totalHorasDobleD: number;
  totalHorasExtraD: number;
  totalHorasAjusteD: number;
  totalHorasM: number;
  totalHorasDobleM: number;
  totalHorasExtraM: number;
  totalHorasAjusteM: number;
  totalHorasN: number;
  totalHorasDobleN: number;
  totalHorasExtraN: number;
  totalHorasAjusteN: number;
  totalHorasColaborador: number;
  private totalHoras: number;

  oldHorasD: number;
  oldHorasAjusteD: number;
  oldHorasExtraD: number;
  oldHorasDobleD: number;

  oldHorasM: number;
  oldHorasAjusteM: number;
  oldHorasExtraM: number;
  oldHorasDobleM: number;

  oldHorasN: number;
  oldHorasAjusteN: number;
  oldHorasExtraN: number;
  oldHorasDobleN: number;

  colaborador: ColaboradorUnidad;

  constructor(private colaboradorService: ColaboradorService,
              private parametroService: ParametroPlanillaService,
              private authService: AuthService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }
  ingresoActivo: boolean;
  parametroPlanilla: ParametroPlanilla;
  ngOnInit() {
   this.obtenerParametro();
  }

  obtenerParametro(): void {
    this.ingresoActivo = true;
    this.parametroService.obtenerParametroUnidad(this.planilla.tipoPlanilla.toString(),
      this.planilla.periodo.toString(),
      this.unidadSeleccionada.codigoDepartamento.toString(),
      this.unidadSeleccionada.codigoUnidad.toString()).subscribe(
      response => {
        if (response.status === 200) {
          if (response.body.estado) {
            if (response.body.data) {
              this.parametroPlanilla = response.body.data;
              this.ingresoActivo = this.parametroPlanilla.activo;
            }
            this.cargarColaboradoresUnidad();
          } else {
            this.mostrarMensaje2(response.body.mensaje);
          }

        } else {
          this.mostrarMensaje2('');
        }
      },
      err => {
        this.mostrarMensaje2('');
      },
      () => {

      }
    );
  }

  cargarColaboradoresUnidad(): void {
    this.colaboradorService.obtenerColaboradorUnidad(this.planilla.tipoPlanilla.toString(),
                                                    this.planilla.periodo.toString(),
                                                    this.unidadSeleccionada.codigoDepartamento.toString(),
                                                    this.unidadSeleccionada.codigoUnidad.toString()).subscribe(
      response => {
        if (response.status === 200) {
          if (response.body.estado) {
              this.colaboradores = response.body.data;
              this.dataSource = new MatTableDataSource(this.colaboradores);
              this.dataSource.paginator = this.paginator;
              this.calcularTotales();
              this.filaEditar = -1;
          } else {
            this.mostrarMensaje2(response.body.mensaje);
          }

        } else {
          this.mostrarMensaje2('');
        }
      },
      err => {
        this.mostrarMensaje2('');
      },
      () => {

      }
    );
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  validarHora(colaboradorUnidad: ColaboradorUnidad): boolean {
    if (!colaboradorUnidad.horasD) {
      colaboradorUnidad.horasD = 0;
    }
    if (!colaboradorUnidad.horasExtraD) {
      colaboradorUnidad.horasExtraD = 0;
    }
    if (!colaboradorUnidad.horasDobleD) {
      colaboradorUnidad.horasDobleD = 0;
    }
    if (!colaboradorUnidad.horasAjusteD) {
      colaboradorUnidad.horasAjusteD = 0;
    }
////
    if (!colaboradorUnidad.horasM) {
      colaboradorUnidad.horasM = 0;
    }

    if (!colaboradorUnidad.horasExtraM) {
      colaboradorUnidad.horasExtraM = 0;
    }

    if (!colaboradorUnidad.horasDobleM) {
      colaboradorUnidad.horasDobleM = 0;
    }

    if (!colaboradorUnidad.horasAjusteM) {
      colaboradorUnidad.horasAjusteM = 0;
    }

    if (!colaboradorUnidad.horasN) {
      colaboradorUnidad.horasN = 0;
    }

    if (!colaboradorUnidad.horasExtraN) {
      colaboradorUnidad.horasExtraN = 0;
    }

    if (!colaboradorUnidad.horasDobleN) {
      colaboradorUnidad.horasDobleN = 0;
    }

    if (!colaboradorUnidad.horasAjusteN) {
      colaboradorUnidad.horasAjusteN = 0;
    }

    // if (event.key === 'Enter' || event.key === 'Tab') {
    if (colaboradorUnidad.horasP <= 0) {
      this.mostrarMensaje2('Cantidad de horas del periodo inválidas');
      return false;
    }

    if (colaboradorUnidad.horasD > colaboradorUnidad.horasP) {
      this.mostrarMensaje2('El total de horas ordinarias diurnas superan las horas del periodo');
      return false;
    }

    if (colaboradorUnidad.horasM > colaboradorUnidad.horasP) {
      this.mostrarMensaje2('El total de horas ordinarias mixtas superan las horas del periodo');
      return false;
    }

    if (colaboradorUnidad.horasN > colaboradorUnidad.horasP) {
      this.mostrarMensaje2('El total de horas ordinarias nocturnas superan las horas del periodo');
      return false;
    }

    this.totalHoras = 0;
    this.totalHoras = colaboradorUnidad.horasD + colaboradorUnidad.horasM + colaboradorUnidad.horasN;

    if (this.totalHoras > colaboradorUnidad.horasP) {
      this.mostrarMensaje2('El total de horas supera la cantidad de horas del periodo');
      return false;
    }

    // tslint:disable-next-line:max-line-length
    if (colaboradorUnidad.horasD < 0 || colaboradorUnidad.horasExtraD < 0 || colaboradorUnidad.horasDobleD < 0 || colaboradorUnidad.horasAjusteD < 0) {
      this.mostrarMensaje2('Cantidad de horas inválidas');
      return false;
    }

    // tslint:disable-next-line:max-line-length
    if (colaboradorUnidad.horasM < 0 || colaboradorUnidad.horasExtraM < 0 || colaboradorUnidad.horasDobleM < 0 || colaboradorUnidad.horasAjusteM < 0) {
      this.mostrarMensaje2('Cantidad de horas inválidas');
      return false;
    }

    // tslint:disable-next-line:max-line-length
    if (colaboradorUnidad.horasN < 0 || colaboradorUnidad.horasExtraN < 0 || colaboradorUnidad.horasDobleN < 0 || colaboradorUnidad.horasAjusteN < 0) {
      this.mostrarMensaje2('Cantidad de horas inválidas');
      return false;
    }
    return true;
  }

  edit(row, element) {
    this.filaEditar = row;
    setTimeout(() => {
      this.inputs.find(x => x.nativeElement.getAttribute('name') === element).nativeElement.focus();
    }, 200);
  }

  actualizarHora(colaboradorUnidad: ColaboradorUnidad, continuaEditando, propiedadSiguiente, event: Event): void {

    if (!this.validarHora(colaboradorUnidad)) {
      return;
    }


    let actualiza = false;
    // this.colaborador = this.buscarColaborador(colaboradorUnidad.identificacion);

    if (this.colaborador == null) {
      return;
    }

    if (JSON.stringify(colaboradorUnidad) !== JSON.stringify(this.colaborador)) {
      actualiza = true;
    }


 /*   if (this.oldHorasD && (parseFloat(this.oldHorasD.toString()) !== parseFloat(colaboradorUnidad.horasD.toString()))) {
      actualiza = true;
    }

    if (this.oldHorasAjusteD && (parseFloat(this.oldHorasAjusteD.toString()) !== parseFloat(colaboradorUnidad.horasAjusteD.toString()))) {
      actualiza = true;
    }

    if (this.oldHorasExtraD && (parseFloat(this.oldHorasExtraD.toString()) !== parseFloat(colaboradorUnidad.horasExtraD.toString()))) {
      actualiza = true;
    }

    if (this.oldHorasDobleD && (parseFloat(this.oldHorasDobleD.toString()) !== parseFloat(colaboradorUnidad.horasDobleD.toString()))) {
      actualiza = true;
    }

    if (this.oldHorasM && (this.oldHorasM !== colaboradorUnidad.horasM)) {
      actualiza = true;
    }

    if (this.oldHorasAjusteM && (this.oldHorasAjusteM !== colaboradorUnidad.horasAjusteM)) {
      actualiza = true;
    }

    if (this.oldHorasExtraM && (this.oldHorasExtraM !== colaboradorUnidad.horasExtraM)) {
      actualiza = true;
    }

    if (this.oldHorasDobleM && (this.oldHorasDobleM !== colaboradorUnidad.horasDobleM)) {
      actualiza = true;
    }

    if (this.oldHorasN && (this.oldHorasN !== colaboradorUnidad.horasN)) {
      actualiza = true;
    }

    if (this.oldHorasAjusteN && (this.oldHorasAjusteN !== colaboradorUnidad.horasAjusteN)) {
      actualiza = true;
    }

    if (this.oldHorasExtraN && (this.oldHorasExtraN !== colaboradorUnidad.horasExtraN)) {
      actualiza = true;
    }

    if (this.oldHorasDobleN && (this.oldHorasDobleN !== colaboradorUnidad.horasDobleN)) {
      actualiza = true;
    }

    if (continuaEditando) {
      event.stopPropagation();
    }
*/
    if (actualiza) {
      this.actualizarHoraColaborador(colaboradorUnidad, propiedadSiguiente);
    } else {
      this.edit(colaboradorUnidad.posicion, propiedadSiguiente);
    }
  }

  limpiarHorasAnteriores(): void {
    this.oldHorasD = undefined;
    this.oldHorasAjusteD = undefined;
    this.oldHorasExtraD = undefined;
    this.oldHorasDobleD = undefined;

    this.oldHorasM = undefined;
    this.oldHorasAjusteM = undefined;
    this.oldHorasExtraM = undefined;
    this.oldHorasDobleM = undefined;

    this.oldHorasN = undefined;
    this.oldHorasAjusteN = undefined;
    this.oldHorasExtraN = undefined;
    this.oldHorasDobleN = undefined;
  }

  actualizarHoraColaborador(colaboradorUnidad: ColaboradorUnidad, propiedadSiguiente: string): void {
    this.colaboradorService.actualizarHora(colaboradorUnidad).subscribe(
      data => {
        // this.editRowId = -1;
        this.mostrarMensaje('Hora actualizada correctamente');
        this.calcularTotales();
        this.edit(colaboradorUnidad.posicion, propiedadSiguiente);
      }, err => {
        this.mostrarMensaje2('Ha ocurrido un error');
      },
      () => {
      }
    );

    this.limpiarHorasAnteriores();
  }


  calcularTotales(): void {
    this.totalHorasD = 0;
    this.totalHorasDobleD = 0;
    this.totalHorasExtraD = 0;
    this.totalHorasAjusteD = 0;

    this.totalHorasM = 0;
    this.totalHorasDobleM = 0;
    this.totalHorasExtraM = 0;
    this.totalHorasAjusteM = 0;

    this.totalHorasN = 0;
    this.totalHorasDobleN = 0;
    this.totalHorasExtraN = 0;
    this.totalHorasAjusteN = 0;

    this.totalHorasColaborador = 0;
    if (this.colaboradores.length > 0) {
      for (const a of this.colaboradores) {
        this.totalHorasD += a.horasD;
        this.totalHorasExtraD  += a.horasExtraD;
        this.totalHorasDobleD  += a.horasDobleD;
        this.totalHorasAjusteD  += a.horasAjusteD;

        this.totalHorasM += a.horasM;
        this.totalHorasExtraM += a.horasExtraM;
        this.totalHorasDobleM += a.horasDobleM;
        this.totalHorasAjusteM += a.horasAjusteM;

        this.totalHorasN += a.horasN;
        this.totalHorasDobleN += a.horasDobleN;
        this.totalHorasExtraN += a.horasExtraN;
        this.totalHorasAjusteN += a.horasAjusteN;

        //
        // tslint:disable-next-line:max-line-length
        // a.totalHorasColaborador = a.horasD + a.horasExtraD + a.horasDobleD + a.horasAjusteD + a.horasM + a.horasDobleM + a.horasAjusteM + a.horasN + a.horasDobleN + a.horasExtraN + a.horasAjusteN;
        a.totalColaborador1 = a.horasD + a.horasM + a.horasN + a.horasAjusteD + a.horasAjusteM + a.horasAjusteN;
        a.totalColaboradorE = a.horasExtraD + a.horasExtraM + a.horasExtraN;
        a.totalColaboradorD = a.horasDobleD + a.horasDobleM + a.horasDobleN;
      }

    }
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

  mostrarInformacionColaborador(colaboradorUnidad: ColaboradorUnidad): void {
    if (this.planilla.aplicado === 1) {
      this.mostrarMensaje2('Este periodo ya se encuentra aplicado por lo que no se pueden realizar modificaciones');
      return;
    }
    if (!this.ingresoActivo) {
      // tslint:disable-next-line:max-line-length
      this.mostrarMensaje2('El ingreso de horas  se encuentra deshabilitado para esta unidad por lo que no se pueden realizar modificaciones!!');
      return;
    }

    const dialogRef = this.dialog.open(
      InformacionColaboradorComponent,
      { width: '90%', height: '90%', data: {c: colaboradorUnidad} });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarColaboradoresUnidad();
    });
  }

  mostrarReporte(planilla: Planilla ): void {
    this.ruta = 'http://' + environment.reportesIp + '/ReportServer/Pages/ReportViewer.aspx?%2fAdministracion%2frptHoras'
      + '&rs:Command=Render&rs:embed=true'
      + '&database=SIC01'
      + '&server=' + environment.baseDatosIp
      + '&descripcionDepartamento=' + this.departamentoInformacion.descripcionDepartamento
      + '&departamento=' + this.departamentoInformacion.codigoDepartamento
      + '&unidad=' + this.unidadSeleccionada.codigoUnidad
      + '&unidadDescripcion=' + this.unidadSeleccionada.descripcionUnidad
      + '&descripcionPlanilla=' + planilla.descripcionPlanilla
      + '&tipoPlanilla=' + planilla.tipoPlanilla
      + '&periodo=' + planilla.periodo
      + '&responsable=' + this.usuario.nombre;

    const dialogRef = this.dialog.open(
      ReporteComponent,
      { width: '90%', height: '90%', data: {ruta: this.ruta} });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
