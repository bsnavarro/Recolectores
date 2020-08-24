import {ColaboradorUnidad} from './colaboradorUnidad';

export class Planilla {
  tipoPlanilla: number;
  descripcionPlanilla: string;
  horas: number;
  periodo: number;
  colaboradorUnidadList: ColaboradorUnidad[];
  aplicado: number;
}
