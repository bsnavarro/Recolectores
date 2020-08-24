import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FacturaGasto} from './modelos/factura-gasto';
import {AceptacionService} from './servicios/aceptacion.service';
import {FacturaManual} from './modelos/factura-manual';
import {FormControl, Validators} from '@angular/forms';
import {Departamento} from './modelos/departamento';
import {MatDialog, MatListOption, MatMenuTrigger, MatSelectionList, MatSelectionListChange} from '@angular/material';
import {DialogoProcesarComponent} from './componentes/dialogo-procesar/dialogo-procesar.component';
import Swal from 'sweetalert2';
import {Proveedor} from '../../modelos/proveedor';
import {FiltroDocumentos} from './modelos/filtro-documentos';
import {ProcesoFactura} from './modelos/proceso-factura';
import {Session} from '../../modelos/session';
import {AuthService} from '../../servicios/auth.service';
import * as BigInt from 'big-integer';
import {Permisos} from './permisos/permisos.enum';
import {NavService} from '../sistemas/servicios/nav-service';
import {DatosModulo} from '../sistemas/modelos/DatosModulo';


@Component({
  selector: 'app-aceptacion',
  templateUrl: './aceptacion.component.html',
  styleUrls: ['./aceptacion.component.css']
})
export class AceptacionComponent implements OnInit {

  constructor(public navService: NavService, private authService: AuthService, private aceptacionService: AceptacionService, public dialogo: MatDialog) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);

    this.aceptacionService.listaFacturasBandeja.subscribe((data: FacturaGasto[]) => this.listaBandeja = data);
    this.aceptacionService.listaFacturasManuales.subscribe((data: FacturaManual[]) => this.listaManuales = data);
    this.aceptacionService.listaDepartamentos.subscribe((data: Departamento[]) => this.listaDepartamentos = data);
  }
  // public bigInt = BigInt;
  public searchText: string;
  private usuario: Session;
  public permisos = Permisos;
  public datosModulo: DatosModulo;

  @ViewChild('bandejaList', {static: true})
  public bandejaList: MatSelectionList;

  @ViewChild(MatMenuTrigger, {static: false})
  public contextMenu: MatMenuTrigger;
  public contextMenuPosition = { x: '0px', y: '0px' };

  public estados: string[];
  public tipos: string[];
  public estadoBandeja: FormControl;
  public tipoBandeja: FormControl;
  public desdeBandeja: FormControl;
  public hastaBandeja: FormControl;
  public departamento: FormControl;
  public buscaProveedor: FormControl;
  public proveedor: Proveedor;


  public listaDepartamentos: Departamento[];
  public listaBandeja: FacturaGasto[];
  public listaManuales: FacturaManual[];


  ngOnInit() {
    this.estados = ['INVALIDO', 'VERIFICADO', 'SIN PROCESAR'];
    this.tipos = ['FacturaElectronica', 'NotaCreditoElectronica'];
    this.proveedor = new Proveedor();
    this.departamento = new FormControl('', [Validators.required]);
    this.buscaProveedor = new FormControl('', [Validators.required]);
    this.estadoBandeja = new FormControl('', [Validators.required]);
    this.tipoBandeja = new FormControl('', [Validators.required]);
    this.desdeBandeja = new FormControl({value: new Date(), disabled: false});
    this.hastaBandeja = new FormControl({value: new Date(), disabled: false});

    this.bandejaList.selectionChange.subscribe((s: MatSelectionListChange) => {
      if (s.option.selected && this.estadoBandeja.value !== 'INVALIDO') {
        this.bandejaList.deselectAll();
        s.option._setSelected(true);
      }
    });

    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarMenu = false;
    this.datosModulo.nombreModulo = 'Módulos de Aceptacion';
    this.datosModulo.navItems =  [
      {
        displayName: 'Aceptación',
        iconName: 'import_contacts',
        route: 'aceptacion',
        param: '100',
        children: []
      },
      {
        displayName: 'Horas planilla',
        iconName: 'folder',
        route: 'horas-planilla/',
        param: '111',
        children: []
      }

    ];
    this.navService.datosModulo.next(this.datosModulo);

    this.limpiardatos();
    this.obtenerDepartamentos();

  }

  getAcceso(permiso: Permisos): boolean {
    return BigInt(this.getUsuario().mascara).and(permiso).eq(permiso);
  }

  getUsuario(): Session {
    return this.usuario;
  }

  getBandeja(): any {
    return this.listaBandeja;
  }

  getColor(dias: number): string {
    const value = (dias > 38 ? 38 : dias) / 38;
    const hue = ((1 - value) * 120).toString(10);
    return ['hsl(', hue, ', 100%, 50%, 0.7)'].join('');
  }

  getManuales(): any {
    return this.listaManuales;
  }

  getDepartamentos(): any {
    return this.listaDepartamentos;
  }

  clearProveedor(): void {
    this.proveedor = new Proveedor();
  }

  clearSeleccion(): void {
    this.bandejaList.deselectAll();
  }

  limpiardatos(): void {
    this.listaManuales = new Array<FacturaManual>();
    this.listaBandeja = new Array<FacturaGasto>();
  }

  onContextMenu(event: MouseEvent, item: FacturaGasto) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item};
    this.contextMenu.openMenu();
  }

  onContextMenuActionRechazar(factura: FacturaGasto) {
    this.procesarDocumento(3, factura.consecutivo);
  }

  onContextMenuActionDescartar(factura: FacturaGasto) {

    if (this.bandejaList.selectedOptions.isEmpty()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Facturas',
        text: 'No se ha seleccionado ninguna factura'
      });
    }

    this.descartarListaDocumentos(99, this.bandejaList.selectedOptions.selected);
  }

  obtenerFacturasBandeja(): void {

    if (this.buscaProveedor.invalid) {
      this.buscaProveedor.reset();
    }

    const parametros = new FiltroDocumentos();
    parametros.tipo = this.tipoBandeja.value;
    parametros.estado = this.estadoBandeja.value;
    parametros.desde = this.desdeBandeja.value.toLocaleString();
    parametros.hasta = this.hastaBandeja.value.toLocaleString();
    parametros.departamento = this.departamento.value;
    parametros.proveedor = this.proveedor.identificacion;

    this.aceptacionService.obtenerFacturasGasto(parametros);
  }

  obtenerDepartamentos(): void {
    this.aceptacionService.obtenerDepartamentos().subscribe(respuesta => {
      if (!respuesta) {
        Swal.fire({
          icon: 'warning',
          title: 'Departamentos',
          text: 'No se pudo consultar la lista de departamentos'
        });
      }
    });
  }

  buscarProveedor(): void {

    if (!this.buscaProveedor.valid) {
      return;
    }

    this.aceptacionService.buscarProveedor(this.buscaProveedor.value).subscribe(respuesta => {
      if (!respuesta.estado) {
        return Swal.fire({
          icon: 'warning',
          title: 'Proveedor',
          text: respuesta.mensaje
        });
      }

      this.proveedor = respuesta.data;
      this.buscaProveedor.setValue(this.proveedor.identificacion);

    });
  }

  confirmarProcesar(manual: FacturaManual): any {

    // if (this.estadoBandeja.value === 'SIN PROCESAR') {
    //   return;
    // }

    if (!this.departamento.value) {

      return Swal.fire({
        icon: 'warning',
        title: 'Parametros',
        text: 'Debe seleccionar un departamento'
      });
    }

    if (this.bandejaList.selectedOptions.isEmpty()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Facturas',
        text: 'No se ha seleccionado ninguna factura'
      });
    }

    const factura = this.bandejaList.selectedOptions.selected[0].value as FacturaGasto;

    if (factura.diasVence < 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Facturas',
        text: 'La factura no se puede procesar, el documento electrónico tiene mas de 38 días de emitido'
      });
    }

    if (manual.proveedor !== factura.numeroCedulaEmisor) {

      return Swal.fire({
        icon: 'warning',
        title: 'Proveedor',
        text: 'El proveedor en las fcturas no son el mismo'
      });
    }

    if (factura.tipo === 'NotaCreditoElectronica') {
      this.aceptacionService.referenciasPendientes(factura.consecutivo, manual.consecutivo).subscribe(respuesta => {
        if (!respuesta) {
          return;
        }

        this.abrirDialogoProcesar(factura.consecutivo, manual.consecutivo);
      });
      return;
    }

    this.abrirDialogoProcesar(factura.consecutivo, manual.consecutivo);
  }

  // position: {top: '10px', right: '10px' }, height: '98%',width: '100vw',panelClass: 'full-screen-modal',

  abrirDialogoProcesar(gasto: string, compra: string) {
    const dialogRef = this.dialogo.open(DialogoProcesarComponent, {data: {gasto, compra, departamento: this.departamento.value}});
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.obtenerFacturasBandeja();
      }
    });
  }

  procesarDocumento(mensaje: number, factura: string, compra?: string) {

    const procesoFactura = new ProcesoFactura();
    procesoFactura.mensaje = mensaje;
    procesoFactura.facturaBandeja = factura;
    procesoFactura.facturaManual = compra;

    this.aceptacionService.procesarDocumento(procesoFactura).subscribe(respuesta => {

      Swal.fire({
        icon: respuesta.estado ? 'success' : 'error',
        title: mensaje === 1 ? 'Aceptar Factura' : mensaje === 3 ? 'Rechazar Factura' : 'Descartar Factura',
        text: respuesta.mensaje
      });

      if (!respuesta.estado) {
        return;
      }

      this.obtenerFacturasBandeja();

    });
  }

  descartarListaDocumentos(mensaje: number, listaSeleccionada: MatListOption[]) {

    const listaFacturasProcesar = [] as Array<ProcesoFactura>;

    for (const selecccion of listaSeleccionada) {

      const factura = selecccion.value as FacturaGasto;

      listaFacturasProcesar.push({mensaje, facturaBandeja: factura.consecutivo});
    }

    this.aceptacionService.descartarListaDocumentos(listaFacturasProcesar).subscribe(respuesta => {

      Swal.fire({
        icon: respuesta.estado ? 'success' : 'error',
        title: mensaje === 1 ? 'Aceptar Factura' : mensaje === 3 ? 'Rechazar Factura' : 'Descartar Factura',
        text: respuesta.mensaje
      });

      if (!respuesta.estado) {
        return;
      }

      this.obtenerFacturasBandeja();

    });
  }
}

