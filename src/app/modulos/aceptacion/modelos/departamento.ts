import {Deserialize} from './deserialize';

export class Departamento implements Deserialize {
  public codigo: number;
  public descripcion: string;
  public unidad: number;
  public area: number;
  public baseDatos: string;
  public baseDatosIp: string;
  public reportesIp: string;
  public mascara: string;
  public modulo: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
