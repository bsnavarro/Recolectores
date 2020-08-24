import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DatosModulo} from '../modelos/DatosModulo';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public datosModulo: BehaviorSubject<DatosModulo>;

  constructor() {
    this.datosModulo = new BehaviorSubject<DatosModulo>(new DatosModulo());
  }
}
