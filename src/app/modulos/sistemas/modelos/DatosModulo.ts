import { Deserialize } from './deserialize';
import {NavItem} from './navItem';

export class DatosModulo implements Deserialize {
  nombreModulo: string;
  mostrarMenu: boolean;
  navItems: NavItem[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
