import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {FincasService} from '../../../servicios/fincas-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Finca} from '../../../modelos/Finca';
import {MatTableDataSource} from '@angular/material/table';
import {Mensajes} from '../../../auxiliares/Mensajes';

@Component({
  selector: 'app-mantenimineto-fincas',
  templateUrl: './mantenimiento-fincas.component.html',
  styleUrls: ['./mantenimiento-fincas.component.css']
})

export class MantenimientoFincasComponent implements OnInit {
  @ViewChild('fincasPag', {static: false, read: MatPaginator}) fincasPaginator: MatPaginator;

  public initForm: boolean;

  // Manejo Marcas Card
  public fincaForm: FormGroup;
  public mostratCardFinca: boolean;
  public accionActualFinca: string;

  // Listas
  public listaFincas: Finca[] = [];
  public listaFincasSource = new MatTableDataSource();
  public columnasFincas: string[] = ['codigo', 'nombre', 'fechaInspeccion'];

  // Data
  public fincaData = new Finca();

  // Filtro
  public filtroDataFinca: string;

  // Modo Select
  public textoModo = 'Mantenimiento';
  public modoSelect = false;

  constructor(@Inject(MAT_DIALOG_DATA) public parametros,
              private formBuilder: FormBuilder,
              private modalActual: MatDialogRef<MantenimientoFincasComponent>,
              private fincaService: FincasService) {
    this.obtenerListaFincas();
    // if (parametros.modo === 'select') {
    //   this.modoSelect = true;
    //   this.textoModo = 'Lista';
    //   this.columnasFincas = ['codigo', 'nombre', 'fechaInspeccion', 'seleccionar'];
    // }
  }

  ngOnInit(): void {
    this.fincaForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombreFinca: ['', Validators.required],
      fechaInspeccion: ['', Validators.required]
    });
  }

  // Metodos
  get controlsFincaForm() {
    return this.fincaForm.controls;
  }

  // region Manejo Card
  crearFincaCardView(): void {
    this.initForm = true;
    this.fincaData = new Finca();
    this.mostratCardFinca = true;
    this.accionActualFinca = 'Crear';
    this.toTop();
  }

  modificarFincaCardView(row): void {
    if (!this.modoSelect) {
      this.initForm = true;
      this.mostratCardFinca = true;
      this.accionActualFinca = 'Modificar';
      this.fincaData = row;
      const fechaInspeccion = new Date(row.fechaInspeccion);
      this.fincaData.fechaInspeccion = fechaInspeccion;
      this.toTop();
    }
  }

  cancelarFincaCardView() {
    this.mostratCardFinca = false;
    this.accionActualFinca = '';
    this.obtenerListaFincas(); /**/
  }

  toTop() {
    const element1 = document.getElementById('topFincas');
    element1.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  // endregion

  // region Filtros
  filtrarFincas = (value: string) => {
    this.listaFincasSource.filter = value.trim().toLocaleLowerCase();
  }

  borrarFiltroFincas() {
    this.filtroDataFinca = '';
    this.filtrarFincas('');
  }

  //#endregion

  // region  Metodos
  cerrarModalFincas(): void {
    this.modalActual.close();
  }

  // endregion

  //  region Obtener datos Service
  obtenerListaFincas() {
    this.fincaService.obtenerListaFincas().subscribe(respuesta => {
      if (respuesta.estado) {
        this.listaFincas = respuesta.data;  /**/
        this.listaFincasSource.data = this.listaFincas;
        this.listaFincasSource.paginator = this.fincasPaginator;
      } else {
        Mensajes.AlertaLogin(respuesta.mensaje, respuesta.estado);
      }
    });
  }


  // Envio Datos Service

  crearModificarFinca(): void {
    this.initForm = false;
    if (this.fincaForm.invalid) {
      return;
    }
    this.fincaService.crearModificarFinca(this.fincaData).subscribe(respuesta => {
      if (respuesta.estado) {
        if (this.accionActualFinca === 'Crear') {
          Mensajes.AlertaLogin('Finca creada correctamente', respuesta.estado);
        }
        if (this.accionActualFinca === 'Modificar') {
          Mensajes.AlertaLogin('Finca modificada correctamente', respuesta.estado);
        }
        this.obtenerListaFincas();
        this.cancelarFincaCardView();
      } else {
        Mensajes.AlertaLogin(respuesta.mensaje, respuesta.estado);
      }
    });
  }
}
