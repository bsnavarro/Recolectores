import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {Respuesta} from '../../../../modelos/respuesta';
import {MatSnackBar} from '@angular/material';
import {UnidadEncargadoService} from '../../servicios/unidad-encargado.service';
import {ColaboradorService} from '../../servicios/colaborador.service';
import {Departamento} from '../../modelos/departamento';
import {DatosModulo} from '../../../sistemas/modelos/DatosModulo';
import {Session} from '../../../../modelos/session';
import {Permisos} from '../../permisos/permisos.enum';
import {NavService} from '../../../sistemas/servicios/nav-service';
import {AuthService} from '../../../../servicios/auth.service';
import {NavItem} from '../../../sistemas/modelos/navItem';
import {EncargadoDepartamento} from '../../modelos/encargadoDepartamento';
import Swal, {SweetAlertResult} from 'sweetalert2';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {
  private usuario: Session;
  public permisos = Permisos;
  public datosModulo: DatosModulo;

  departamento: Departamento;
  encargadoDepartamentos: EncargadoDepartamento[];
  respuesta: Respuesta;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute,  private authService: AuthService, private breakpointObserver: BreakpointObserver, private colaboradorService: ColaboradorService,
              private unidadEncargadoService: UnidadEncargadoService,
              private navService: NavService,
              private router: Router,
              private snackBar: MatSnackBar) {

    this.datosModulo = new DatosModulo();
   // this.datosModulo.nombreModulo = 'Modulo horas planilla';
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.navItems = [];
    this.navService.datosModulo.next(this.datosModulo);
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);

    this.navService.parametro.subscribe((parametro: any) => {
      this.datosModulo.nombreModulo = parametro ? 'Modulo horas planilla - ' + parametro.displayName : 'Modulo horas planilla';
      this.navService.datosModulo.next(this.datosModulo);
    });
  }
  ngOnInit() {
    this.cargarUnidadesPorEncargado();
  }

  cargarUnidadesPorEncargado(): void {
    // tslint:disable-next-line:max-line-length
    this.unidadEncargadoService.obtenerUnidadesEncargado().subscribe(
      response => {
        if (response.status === 200) {
          this.respuesta = response.body;
          if (this.respuesta.estado) {
            this.encargadoDepartamentos = response.body.data;
            this.encargadoDepartamentos.forEach(dpto => {
              const item = new NavItem();
              item.displayName = dpto.descripcionDepartamento;
              item.param = {departamento: dpto.codigoDepartamento.toString()};
              item.modoOperacion = 'item';
              item.children = [];
              dpto.encargadoUnidadList.forEach( unidad => {
                const itemUnidad = new NavItem();
                itemUnidad.displayName = unidad.descripcionUnidad;
                itemUnidad.param = unidad;
                itemUnidad.modoOperacion = 'click';
                item.children.push(itemUnidad);
                });
              this.datosModulo.navItems.push(item);

            });
            this.navService.abrirmenu.next(true);

            this.navService.datosModulo.next(this.datosModulo);
            // this.opened = true;
          } else {
            this.mostrarMensaje2('Atención', 'warning', this.respuesta.mensaje);
          }
        } else {
          this.mostrarMensaje2('Atención', 'error', 'Ha ocurrido un error al consultar las unidades del encargado');
        }
      },
      err => {
        console.log(err);
        this.mostrarMensaje2('Atención', 'error', 'Ha ocurrido un error');
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

  mostrarMensaje2(titulo: string, icono: any, mensaje: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: icono,
      title: titulo,
      text: mensaje
    });
  }

}
