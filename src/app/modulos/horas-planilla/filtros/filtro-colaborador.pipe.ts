import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroColaborador'
})
export class FiltroColaboradorPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
