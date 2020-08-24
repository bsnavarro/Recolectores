
import {Deserialize} from './deserialize';

export class PersonaTipoIdentificacion implements Deserialize {

  public tipoIdentificacion: string;
  public descripcion: string;
  public inactivo: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
