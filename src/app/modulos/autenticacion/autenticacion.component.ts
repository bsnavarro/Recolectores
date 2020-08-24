import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../servicios/auth.service';

import {DatosModulo} from './modelos/DatosModulo';
import {NavService} from './servicios/nav-service';
import {Mensajes} from './auxiliares/Mensajes';
import {AppConstants} from './auxiliares/constants';
import {MatDialog} from '@angular/material/dialog';
import {ResetPasswordComponent} from './componentes/reset-password/reset-password.component';
library.add(fas);
@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {
  public loginForm: FormGroup;
  public datosModulo: DatosModulo;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService, private navService: NavService,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.nombreModulo = 'Sistema Administración';
    this.navService.datosModulo.next(this.datosModulo);
  }

  ingresar(): void {


    if (this.loginForm.invalid) {
      return;
    }


    this.authService.iniciarSession(this.loginForm.value).subscribe(respuesta => {
      if (!respuesta) {
        return;
      }

      Mensajes.AlertaLogin(respuesta.mensaje, respuesta.estado);

      if (respuesta.codigo === AppConstants.responseCode().SESSION_ACTIVE) {
        return this.desbloquear(respuesta.mensaje);
      }

      if (respuesta.codigo === AppConstants.responseCode().RESET_PASSWORD) {
        return  this.resetearPassword();
      }

   //   this.router.navigate(['departamentos']);
      this.router.navigate(['recolectores/inicio']);

    });

  }

  desbloquear(mensaje): void {
    Mensajes.mensajeTexto('Desbloquear Usuario', mensaje, 'Ingresar').then((result) => {
      if (!result.value) {
        return;
      }
      this.authService.desbloquear({usuario: this.loginForm.value.usuario, password: result.value}).subscribe(respuesta => {
        Mensajes.AlertaLogin(respuesta.mensaje, respuesta.estado);
        if (respuesta.estado) {
          // this.router.navigate(['/departamentos']);
          this.router.navigate(['recolectores/inicio']);
        }
      });
    });
  }

  resetearPassword(): void {
    const dialogRef = this.dialog.open(
      ResetPasswordComponent,
      { width: '90%', height: '90%', data: {u: this.loginForm.value.usuario, p: this.loginForm.value.password}});

    dialogRef.afterClosed().subscribe(result => {
//
    });
    return;
  }
}
