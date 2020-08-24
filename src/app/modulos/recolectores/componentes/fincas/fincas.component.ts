import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatosModulo} from '../../modelos/DatosModulo';
import {NavService} from '../../servicios/nav-service';
import {MantenimientoPersonasComponent} from '../modals-mantenimientos/mantenimiento-personas/mantenimiento-personas.component';
import {MantenimientoFincasComponent} from '../modals-mantenimientos/mantenimiento-fincas/mantenimiento-fincas.component';
import {FincasService} from '../../servicios/fincas-service';
import {Finca} from '../../modelos/Finca';
import {Mensajes} from '../../auxiliares/Mensajes';
import {MatPaginator} from '@angular/material/paginator';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-recolectores-fincas',
  templateUrl: './fincas.component.html',
  styleUrls: ['./fincas.component.css']
})

export class FincasComponent implements OnInit, AfterViewInit {
  @ViewChild('fincasPag', {static: false, read: MatPaginator}) fincasPaginator: MatPaginator;

  public datosModulo: DatosModulo;

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

  constructor(public navService: NavService, private fincasService: FincasService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.prepararMenu();
    this.obtenerListaFincasProductor();
  }

  prepararMenu(): void {
    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarHome = true;
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.nombreModulo = 'Portal Recolectores';
    this.datosModulo.navItems = [
      {
        displayName: 'Mantenimientos',
        iconName: 'settings',
        route: 'EntregaAbono',
        children: [
          {
            displayName: 'Mantenimiento Personas',
            iconName: 'people',
            esModal: true,
            disableClickOutside: false,
            modal: MantenimientoPersonasComponent,
            height: '95%',
            width: '95%',
            parametrosModal: {}
          },
          {
            displayName: 'Mantenimiento Fincas',
            iconName: 'place',
            esModal: true,
            disableClickOutside: false,
            modal: MantenimientoFincasComponent,
            height: '95%',
            width: '95%',
            parametrosModal: {}
          },
        ]
      },
      {
        displayName: 'Estado Salud',
        iconName: 'insert_drive_file',
        route: 'recolectores/estadosalud'
      },
      {
        displayName: 'Manual Módulo',
        iconName: 'book',
        // manual: true,
        // linkManual: 'assets/Manual/ManualModuloContratosCafe.pdf'
      },
    ];
    this.navService.updateDatosModulos(this.datosModulo);
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

  // endregion

  //  region Obtener datos Service
  obtenerListaFincasProductor() {
    this.fincasService.obtenerListaFincasProductor('102000715').subscribe(respuesta => {
      if (respuesta.estado) {
        this.listaFincas = respuesta.data;  /**/
        this.listaFincasSource.data = this.listaFincas;
        this.listaFincasSource.paginator = this.fincasPaginator;
        console.log(respuesta);
      } else {
        Mensajes.AlertaLogin(respuesta.mensaje, respuesta.estado);
      }
    });
  }

  // endregion

  // region Envio Datos Service
  // endregion

}
