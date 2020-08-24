import {Deserialize} from './deserialize';

export class Session implements Deserialize {
  public nombre: string;
  public cedula: string;
  public cuenta: string;
  public banco: string;
  public ip: string;
  public contexto: string;
  public sesionID: string;
  public mascara: string;
  public unidad: string;
  public codigoUnidad: string;
  public codigo: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
