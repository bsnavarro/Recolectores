import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PersonaR} from '../../../modelos/PersonaR';
import {PersonasrService} from '../../../servicios/personasr-service';
import {Mensajes} from '../../../auxiliares/Mensajes';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-modal-personas',
  templateUrl: './mantenimiento-personas.component.html',
  styleUrls: ['./mantenimiento-personas.component.css']
})

export class MantenimientoPersonasComponent implements OnInit, AfterViewInit {
  @ViewChild('personasRecolectorasPag', {
    static: false,
    read: MatPaginator
  }) personasRecolectorasPaginator: MatPaginator;

  // Manejo Form Persona Recolectora
  public initFormPersonaRecolectora: boolean;

  // Manejo Persona Card Recolectora
  public personaRecolectoraForm: FormGroup;
  public mostrarCardPersonaRecolectora: boolean;
  public accionActualPersonaRecolectora: string;

  // Tabla Lista Persona Recolectora
  public listaPersonasRecolectorasSource = new MatTableDataSource();
  public columnasPersonasRecolectoras: string[] = ['identificacion', 'nombre', 'primerApellido', 'segundoApellido'];

  // Datos Persona Recolectora
  public personaRecolectora = new PersonaR();
  public listaPersonasRecolectoras: PersonaR[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public parametros,
              private formBuilder: FormBuilder,
              public dialogo: MatDialog,
              private modalActual: MatDialogRef<MantenimientoPersonasComponent>,
              private personarService: PersonasrService) {
  }

  ngOnInit(): void {
    this.personaRecolectoraForm = this.formBuilder.group({
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required]
      // personaTelefonosFiArray: this.formBuilder.array([this.createDinamicTelefono()]),
      // personaCorreosFiArray: this.formBuilder.array([this.createDinamicCorreo()])
    });
    this.obtenerListaRecolectores();
  }

  ngAfterViewInit(): void {
  }

  // region Manejo Vista Personas Recolectoras
  crearPersonaRecolectoraCardView(): void {

  }

  modificarPersonaRecolectoraCardView(row): void {
    this.personaRecolectora = row;
  }

  cerrarModalPersonas(): void {
    this.modalActual.close();
  }

  // endregion

  // region Metodos
  toTop() {
    const element1 = document.getElementById('topPersonas');
    element1.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // 0-Recolectores 1-Productores
    if (tabChangeEvent.index === 0) {
      // this.cancelarPersonaRecolectoraCardView();
    } else if (tabChangeEvent.index === 1) {
      // this.cancelarPersonaproductoraVCardView();
    }
  }
  // endregion


  // region Obtener Datos Service Recolectores
  obtenerListaRecolectores() {
    this.personarService.obtenerListaRecolectores().subscribe(respuesta => {
      if (respuesta.estado) {
        this.listaPersonasRecolectoras = respuesta.data;
        this.listaPersonasRecolectorasSource.data = this.listaPersonasRecolectoras;
        this.listaPersonasRecolectorasSource.paginator = this.personasRecolectorasPaginator;
        console.log(this.listaPersonasRecolectoras);
      } else {
        Mensajes.AlertaLogin(respuesta.mensaje, respuesta.estado);
      }
    });
  }

  // endregion
}
