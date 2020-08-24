import {Deserialize} from './deserialize'

export class Formulario implements Deserialize {

  public idFormulario: number;
  public idTipoFormulario: string;
  public fechaCreacion: Date;
  public identificacion: string;
  public tipoIdentificacion: string;
  public nombreCompleto: string;
  public numeroFolio: number;
  public provincia: string;
  public canton: string;
  public distrito: string;
  public barrio: string;
  public otrasSenas: string;
  public constituirFolioFamiliar: boolean;
  public inscrito: boolean;
  public actividad: boolean;
  public emiteFactura: boolean;
  public reporteGenerado: boolean;
  public cantidadReporte: number;
  public fechaUltimoReporte: Date;
  public idUsuario: string;
  public nombreUsuario: string;
  public cambioNucleo: boolean;
  public motivo: string;
  public noGenerar: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
