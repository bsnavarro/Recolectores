import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Mensajes} from '../../auxiliares/Mensajes';
import {AuthService} from '../../../../servicios/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public loginForm: FormGroup;
  usuario: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {u: string, p: string},
              private authService: AuthService) {
    this.usuario = data.u;
    this.password = data.p;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmapswd: ['', Validators.required]
    });
  }
  resetear(): void {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.value.password.toString().trim() !== this.loginForm.value.confirmapswd.toString().trim()) {
      Mensajes.mostrarMensaje2('Alerta', 'warning', 'Las contraseñas no coinciden')
        .then(() => console.log('las contraseñas no coinciden')) ;
      return;
    }

    if (this.password.toString().trim() === this.loginForm.value.password.toString().trim() ||
      this.password.toString().trim() === this.loginForm.value.confirmapswd.toString().trim() ) {

      Mensajes.mostrarMensaje2('Alerta', 'warning', 'Las contraseña nueva no puede ser igual que la anterior')
        .then(() => console.log('contraseña igual a la anterior')) ;
      return;
    }


    this.authService.actualizarCredenciales({usuario: this.usuario, password: this.password,
                                                    passwordCambio: this.loginForm.value.password}).subscribe(respuesta => {
      if (!respuesta) {
        return;
      }

      if (respuesta.estado) {
        Mensajes.mostrarMensaje2('Actualización correcta', 'success', respuesta.mensaje).then(() => this.dialogRef.close());
      } else {
        Mensajes.mostrarMensaje2('Error', 'error', respuesta.mensaje).then(() => console.log(respuesta.mensaje));
      }

      this.dialogRef.close();
    });
  }

}
