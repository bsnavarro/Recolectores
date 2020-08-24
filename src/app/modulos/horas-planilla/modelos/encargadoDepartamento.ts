import {EncargadoUnidad} from './encargadoUnidad';
import {Deserialize} from './deserialize';

export class EncargadoDepartamento implements Deserialize {
  codigoDepartamento: number;
  descripcionDepartamento: string;
  activo: boolean;
  encargadoUnidadList: EncargadoUnidad[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
