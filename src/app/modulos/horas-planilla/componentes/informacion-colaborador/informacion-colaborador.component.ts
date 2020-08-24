import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ColaboradorUnidad} from '../../modelos/colaboradorUnidad';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {ColaboradorService} from '../../servicios/colaborador.service';
import { Observable, Subject } from 'rxjs';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {MatInput} from '@angular/material/input';
@Component({
  selector: 'app-informacion-colaborador',
  templateUrl: './informacion-colaborador.component.html',
  styleUrls: ['./informacion-colaborador.component.css']
})
export class InformacionColaboradorComponent implements OnInit {
  public colaboradorUnidad: ColaboradorUnidad;
  private totalHoras: number;
  @ViewChildren(MatInput, {read: ElementRef}) inputs: QueryList<ElementRef>;

  constructor(public dialogRef: MatDialogRef<InformacionColaboradorComponent>, @Inject(MAT_DIALOG_DATA) public data: {c: ColaboradorUnidad},
              private colaboradorService: ColaboradorService) {
    this.colaboradorUnidad = data.c;
  }

  ngOnInit() {
  }

  public actualizarHoraColaborador(form: NgForm): void {
    if (!form.valid) {
      this.mostrarMensaje2('Atención', 'warning', 'Datos inválidos');
    }
    if (form.value.horasD < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'El total de horas ordinarias diurnas deben ser mayores o iguales  a Cero(0)');
        return;
    }
    if (form.value.horasAjusteD < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas ajuste diarias deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasExtraD < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas extra diarias deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasDobleD < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas doble diarias deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasM < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'El total de horas ordinarias mixtas deben ser mayores o iguales  a Cero(0)');
        return;
    }
    if (form.value.horasAjusteM < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas ajuste mixtas deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasExtraM < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas extra mixtas deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasDobleM < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas doble mixtas deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasN < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'El total de horas nocturnas mixtas deben ser mayores o iguales  a Cero(0)');
        return;
    }
    if (form.value.horasAjusteN < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas ajuste nocturnas deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasExtraN < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas extra nocturnas deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasDobleN < 0) {
        this.mostrarMensaje2('Valor inválido', 'warning', 'Las horas doble nocturnas deben ser mayores o  iguales a Cero(0)');
        return;
    }
    if (form.value.horasD > this.colaboradorUnidad.horasP) {
        this.mostrarMensaje2('Advertencia', 'warning', 'El total de horas ordinarias diurnas superan las horas del periodo');
        return;
    }
    if (form.value.horasM > this.colaboradorUnidad.horasP) {
        this.mostrarMensaje2('Advertencia', 'warning', 'El total de horas ordinarias mixtas superan las horas del periodo');
        return;
    }
    if (form.value.horasN > this.colaboradorUnidad.horasP) {
        this.mostrarMensaje2('Advertencia', 'warning', 'El total de horas ordinarias nocturnas superan las horas del periodo');
        return;
    }

    this.totalHoras = 0;
    this.totalHoras = form.value.horasD + form.value.horasM + form.value.horasN;
    if (this.totalHoras > this.colaboradorUnidad.horasP) {
        this.mostrarMensaje2('Advertencia', 'warning', 'El total de horas supera la cantidad de horas del periodo');
        return;
    }
    this.colaboradorService.actualizarHora(this.colaboradorUnidad)
      .subscribe(respuesta => {
          if (respuesta.estado) {
            this.dialogRef.close();
            this.mostrarMensaje2('Información', 'success', respuesta.mensaje);
          } else {
            this.mostrarMensaje2('Advertencia', 'warning', respuesta.mensaje);
          }

        },
        err => {
          console.log(err);
          this.mostrarMensaje2('Error', 'error', 'Ha ocurrido un error al actualizar el estado de la unidad');
        },
        () => {
        }
      );
  }


  mostrarMensaje2(titulo: string, icono: any, mensaje: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: icono,
      title: titulo,
      text: mensaje
    });
  }

  focus(element) {
    setTimeout(() => {
      this.inputs.find(x => x.nativeElement.getAttribute('name') === element).nativeElement.focus();
    }, 200);
  }
}
