export class PersonaAuditoria {
  codigoCambio: number;
  identificacion: string;
  tipoIdentificacion: string;
  fechaRegistro: Date;
  identificacionUsuario: string;
  nombreUsuario: string;
  accion: string;
  tabla: string;
  observacion: string;
  generaReporte: boolean;
  reporteGenerado: boolean;
  dato: string;
  datoAntes: string;
  datoDespues: string;
  cantidadReporte: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
