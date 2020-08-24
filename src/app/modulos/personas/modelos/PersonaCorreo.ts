export class PersonaCorreo {

  identificacion: string;
  tipoIdentificacion: string;
  correo: string;
  fechaActualizacion: Date;
  cedulaUsuarioActualiza: string;
  nombreUsuarioActualiza: string;
  principal: boolean;
  copia: boolean;
  supermercados: boolean;
  automotriz: boolean;
  ferreteriasInsumos: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
