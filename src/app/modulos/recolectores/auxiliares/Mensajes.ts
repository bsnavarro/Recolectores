import Swal, {SweetAlertResult} from 'sweetalert2';

export class Mensajes {

  static AlertaLogin(texto: string, estado: boolean): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: false,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    // Esto da marca error pero está bien, parece que no detecta el tipo de parametro
    Toast.fire({
      icon: estado ? 'success' : 'error',
      title: texto
    });
  }

  static DialogoConfirmacion(titulo: string, texto: string) {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    });
  }

  static mensajeTexto(titulo: string, texto: string, botonAceptar: string) {
    return Swal.fire({
      title: titulo,
      text: texto,
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: botonAceptar,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      confirmButtonColor: '#1C5531'
    });
  }

  static mostrarMensaje2(titulo: string, icono: any, mensaje: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: icono,
      title: titulo,
      text: mensaje
    });
  }

}
