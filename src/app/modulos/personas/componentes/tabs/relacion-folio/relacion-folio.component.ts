import {Component, Input, OnInit} from '@angular/core';
import {Session} from "../../../../../modelos/session";
import {DatosModulo} from "../../../../sistemas/modelos/DatosModulo";
import {FormControl, Validators} from "@angular/forms";
import {Persona} from "../../../modelos/persona";
import {PersonaRelacionFolioTipo} from "../../../modelos/PersonaRelacionFolioTipo";
import {PersonaRelacionFolio} from "../../../modelos/PersonaRelacionFolio";
import {AuthService} from "../../../../../servicios/auth.service";
import {NavService} from "../../../../sistemas/servicios/nav-service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {PersonaRelacionFolioService} from "../../../servicios/personaRelacionFolio.service";
import {filter} from "rxjs/operators";
import Swal from "sweetalert2";

import {MatDialog} from '@angular/material';
import {ModalFormulariosComponent} from "../../modal/modal-formularios/modal-formularios.component";
import {ModalCambioNucleoComponent} from "../../modal/modal-cambio-nucleo/modal-cambio-nucleo.component";
import {PersonaService} from "../../../servicios/persona.service";
import {Formulario} from "../../../modelos/Formulario";

@Component({
  selector: 'app-relacion-folio',
  templateUrl: './relacion-folio.component.html',
  styleUrls: ['./relacion-folio.component.css']
})
export class RelacionFolioComponent implements OnInit {

  private _persona: Persona;
  get persona(): Persona {
    return this._persona;
  }

  @Input()
  set persona(val: Persona) {
    this._persona = val;
    if (this._persona.personaRelacionFoliosNucleo) {

      let personaRelacionFolios = this._persona.personaRelacionFoliosNucleo.filter(value => value.nucleo);
      this.relacionNucleo = personaRelacionFolios[0];
    }
    this.formularioCambios();
  }

  relacionNucleo: PersonaRelacionFolio;
  private usuario: Session;
  public datosModulo: DatosModulo;
  formulario: Array<Formulario>;

  private readonly tipoBusquedaTodo = 'Todo';
  private readonly tipoBusquedaCodigo = 'Codigo';
  private readonly tipoBusquedaFolio = 'Folio';

  identificacion: FormControl;
  folioRelacion: FormControl;
  listaTiposRelacion: Array<PersonaRelacionFolioTipo>;
  idRelacionFolio: any;

  cantidadDeReportesPendientes = 0;

  public personaRelacionFolio: PersonaRelacionFolio;
  public personaRelacionFolioTemp: PersonaRelacionFolio;

  editar: boolean;

  constructor(
    private authService: AuthService,
    public navService: NavService,
    private router: Router,
    public personaRelacionFolioService: PersonaRelacionFolioService,
    public personaService: PersonaService,
    public dialog: MatDialog
  ) {
    this.editar = false;
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);

  }

  ngOnInit() {
    this.folioRelacion = new FormControl('', [Validators.required]);

    this.personaRelacionFolioService.listaTiposRelacion().subscribe(value => {
      this.listaTiposRelacion = value.data;
    });
    this.formularioCambios();
    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.nombreModulo = 'Consulta de personas';
  }

  buscar(): void {
    this.personaService.buscarPersona(this.persona.identificacion).subscribe(respuesta => {
      if (respuesta.estado) {
        this.formularioCambios();
      }
    });
  }

  formularioCambios(): void {
    this.personaRelacionFolioService.listaFormulario(this.persona).subscribe(value => {
      this.formulario = value.data;
      this.cantidadDeReportesPendientes = this.formulario.filter(value1 => {
        return !value1.reporteGenerado;
      }).length;
    });
  }

  guardarRelacion() {
    if (!this.folioRelacion.valid) {
      return Swal.fire({icon: 'info', title: 'Personas', text: 'Debe ingresar un folio'});
    }

    if (!this.personaRelacionFolio) {
      return Swal.fire({icon: 'info', title: 'Personas', text: 'Debe buscar una persona'});
    }

    if (!this.personaRelacionFolio.nombreRelacion) {
      return Swal.fire({icon: 'info', title: 'Personas', text: 'Debe buscar una persona'});
    }

    if (!this.idRelacionFolio) {
      return Swal.fire({icon: 'info', title: 'Personas', text: 'Debe ingresar una relación'});
    }
    let temp = this.personaRelacionFolio.idRelacionFolio;
    this.personaRelacionFolio.idRelacionFolio = this.idRelacionFolio;

    if (JSON.stringify(this.personaRelacionFolio) == JSON.stringify(this.personaRelacionFolioTemp)) {
      return Swal.fire({icon: 'info', title: 'Personas', text: 'Se debe modificar el objeto'});
    }

    const relacionTipo = this.listaTiposRelacion.filter(value => {
      return value.idRelacionFolio === this.idRelacionFolio;
    });
    this.personaRelacionFolio.personaRelacionFolioTipoByIdRelacionFolio = relacionTipo[0];


    this.personaRelacionFolio.identificacion = this.persona.identificacion;
    this.personaRelacionFolio.tipoIdentificacion = this.persona.tipoIdentificacion;

    this.personaRelacionFolioService.guardarPersonaRelacionFolio(this.personaRelacionFolio, this.editar).subscribe(value => {
      if (value.estado) {
        this.personaRelacionFolio = new PersonaRelacionFolio();
        this.folioRelacion.setValue('');
        this.idRelacionFolio = undefined;
        this.editar = false;
        this.buscar();
        return;
      }
      this.personaRelacionFolio.idRelacionFolio = temp;
    });
  }

  buscarPersonaRelacion() {
    if (!this.folioRelacion.valid) {
      return;
    }

    let busqueda = this.persona.personaRelacionFoliosNucleo.filter(value => {
      return Number(value.numeroFolio) === Number(this.folioRelacion.value);
    });

    if (busqueda.length > 0) {
      return Swal.fire({icon: 'info', title: 'Ya existe', text: 'El numero de folio ya se encuentra relacionado'});
    }

    this.personaService.buscarPersona(this.folioRelacion.value, 'Folio').subscribe(respuesta => {
      if (respuesta.estado) {
        const persona = respuesta.data as Persona;
        this.personaRelacionFolio = new PersonaRelacionFolio();
        this.personaRelacionFolio.nombreRelacion = persona.nombreCompleto;
        this.personaRelacionFolio.numeroFolio = this.folioRelacion.value;
        this.personaRelacionFolio.identificacionRelacion = persona.identificacion;
        this.personaRelacionFolio.tipoIdentificacionRelacion = persona.tipoIdentificacion;
      }
    });
  }


  editarRelacion(relacion) {
    this.personaRelacionFolio = relacion;
    this.personaRelacionFolioTemp = JSON.parse(JSON.stringify(relacion));
    this.idRelacionFolio = this.personaRelacionFolio.idRelacionFolio;
    this.folioRelacion.setValue(this.personaRelacionFolio.numeroFolio);
    this.editar = true;
  }

  borrarRelacion(relacion) {
    Swal.fire({
      title: 'Desea eliminar la relación?',
      text: "Esto eliminara la relación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      // cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.personaRelacionFolioService.desinscribir(relacion).subscribe(value => {
          if (value.estado) {
            this.personaRelacionFolio = new PersonaRelacionFolio();
            this.folioRelacion.setValue('');
            this.idRelacionFolio = undefined;
            this.buscar();
          }
        });
      }
    });
  }

  crearFolioFamiliar() {
    Swal.fire({
      title: 'Desea crear un folio familiar?',
      text: "Se validara las condiciones y estado en hacienda!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#060',
      // cancelButtonColor: '#3085d6',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.personaRelacionFolioService.crearFolioFamiliar(this.persona).subscribe(value => {
          if (value.estado) {
            this.folioRelacion.setValue('');
            this.idRelacionFolio = undefined;
            this.buscar();
          }
        });

      }
    });
  }


  desinscribir() {
    Swal.fire({
      title: '¿Desea desincribir el folio familiar?',
      text: "Esto eliminara la relación de todos los inscritos!",
      icon: 'warning',
      input: 'select',
      inputOptions: {
        'Fallecimiento': 'Fallecimiento',
        'Constitucion de un folio individual': 'Constitucion de un folio individual',
        'Renuncia como asociado': 'Renuncia como asociado'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      // cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const relacionNucleo = new PersonaRelacionFolio();

        relacionNucleo.identificacionRelacion = this.persona.identificacion;
        relacionNucleo.tipoIdentificacionRelacion = this.persona.tipoIdentificacion;
        relacionNucleo.identificacion = this.persona.identificacion;
        relacionNucleo.tipoIdentificacion = this.persona.tipoIdentificacion;
        relacionNucleo.nucleo = true;

        this.personaRelacionFolioService.desinscribir(relacionNucleo).subscribe(value => {
          if (value.estado) {
            this.personaRelacionFolio = new PersonaRelacionFolio();
            this.folioRelacion.setValue('');
            this.idRelacionFolio = undefined;
            this.buscar();
          }
        });
      }
    });
  }

  reporteCambio() {

    this.personaRelacionFolioService.listaFormulario(this.persona).subscribe(value => {
      this.formulario = value.data;
      const dialogRef = this.dialog.open(ModalFormulariosComponent, {
        width: '99%'
      });
      dialogRef.componentInstance.formulario = this.formulario;

      dialogRef.afterClosed().subscribe(result => {
        this.formularioCambios();
      });

    });
  }

  cambioNucleo() {
    const dialogRef = this.dialog.open(ModalCambioNucleoComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.folioActual = this.relacionNucleo;

    dialogRef.afterClosed().subscribe(result => {
      this.formularioCambios();
    });
  }

  inscribir() {
    Swal.fire({
      title: '¿Desea terminar de editar?',
      text: "Esto habilitara el folio familiar, pero no dejara modificar el mismo hasta la siguiente cosecha",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#060',
      // cancelButtonColor: '#3085d6',
      confirmButtonText: 'Habilitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.personaRelacionFolioService.inscribir(this.persona).subscribe(value => {
          if (value.estado) {
            this.buscar();
          }
        });
      }
    });
  }

  actualizarPersonaTributacion() {
    this.persona.personaTributacion.generaFacturaCompra = !this.persona.personaTributacion.generaFacturaCompra;
    this.personaService.actualizarPersonaTributacion(this.persona.personaTributacion).subscribe(respuesta => {
      if (respuesta.estado) {
        this.buscar();
      }
    });
  }

  modificarFolio() {
    Swal.fire({
      title: 'Desea modificar el folio familiar?',
      text: "Solo se permite una unica modificación por cocecha!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#060',
      // cancelButtonColor: '#3085d6',
      confirmButtonText: 'Modificar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const relacionNucleo = new PersonaRelacionFolio();

        relacionNucleo.identificacionRelacion = this.persona.identificacion;
        relacionNucleo.tipoIdentificacionRelacion = this.persona.tipoIdentificacion;
        relacionNucleo.identificacion = this.persona.identificacion;
        relacionNucleo.tipoIdentificacion = this.persona.tipoIdentificacion;
        relacionNucleo.nucleo = true;

        this.personaRelacionFolioService.modificar(relacionNucleo).subscribe(value => {
          if (value.estado) {
            this.personaRelacionFolio = new PersonaRelacionFolio();
            this.folioRelacion.setValue('');
            this.idRelacionFolio = undefined;
            this.buscar();
          }
        });
      }
    });
  }

  estados(relacionNucleo: PersonaRelacionFolio) {

    if (!relacionNucleo) {
      return;
    }

    if (relacionNucleo.estadoRelacion === 'PENDIENTE') {
      return "INSCRIBIR FOLIO";
    }

    if (relacionNucleo.estadoRelacion === 'MODIFICACION') {
      return "MODIFICAR FOLIO";
    }

    if (relacionNucleo.estadoRelacion === 'INSCRITO') {
      return "DESINSCRIBIR";
    }

    if(relacionNucleo.estadoRelacion === 'CAMBIO NUCLEO'){
      return "CAMBIO NUCLEO";
    }
  }

  estadosMetodos(relacionNucleo: PersonaRelacionFolio) {

    if (!relacionNucleo) {
      return;
    }

    if (relacionNucleo.estadoRelacion === 'PENDIENTE') {
      return this.inscribir();
    }

    if (relacionNucleo.estadoRelacion === 'MODIFICACION') {
      return this.modificarFolio();
    }

    if (relacionNucleo.estadoRelacion === 'INSCRITO') {
      return this.desinscribir();
    }

    if(relacionNucleo.estadoRelacion === 'CAMBIO NUCLEO'){
      return this.modificarFolio();
    }
  }

}
