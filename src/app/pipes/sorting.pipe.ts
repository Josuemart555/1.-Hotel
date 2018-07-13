import { Pipe, PipeTransform } from '@angular/core';
import { TipoHabitacion } from '../interface/tipo-habitacion';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(habitaciones: TipoHabitacion[], path: string[], order: number = 1): TipoHabitacion[] {

   // Check if is not null
   if (!habitaciones || !path || !order) return habitaciones;

   return habitaciones.sort((a: TipoHabitacion, b: TipoHabitacion) => {
     // We go for each property followed by path
     path.forEach(property => {
       a = a[property];
       b = b[property];
     })

     // Order * (-1): We change our order
     return a > b ? order : order * (- 1);
   })
 }

}
