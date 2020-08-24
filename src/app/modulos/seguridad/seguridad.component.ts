import { Component, OnInit } from '@angular/core';
import {UsuariosService} from './servicios/usuarios.service';
import {Usuario} from '../../modelos/usuario';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {
  public usuarioForm: FormGroup;
  // private usuario: Usuario;
  private listaUsuarios: Usuario[];
  constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder) {
    this.listaUsuarios = new Array<Usuario>();
    this.usuariosService.listaUsuarios.subscribe(data => this.listaUsuarios = data);
  }

  ngOnInit() {

    this.usuarioForm = this.formBuilder.group({
      identificacion: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      nombre: ['', Validators.required]
    });
    this.obtenerUsuarios();
  }

  getUsuarios(): any {
    return this.listaUsuarios;
  }


  obtenerUsuarios(): void {
    this.usuariosService.obtenerUsuarios(1).subscribe(data => {
      if (!data) {
        alert('No se pudo obtener los usuarios');
      }
    });
  }

  agregarUsuario(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    this.usuariosService.agregarUsuario(this.usuarioForm.value, 1).subscribe(respuesta => {

      if (!respuesta) {
        return;
      }

      this.obtenerUsuarios();
      this.usuarioForm.reset();
      //
      // this.router.navigate(['/principal']);

    });

  }
}
