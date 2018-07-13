import { Injectable } from '@angular/core';
import { TipoHabitacion } from '../interface/tipo-habitacion';

@Injectable()
export class TipoHabitacionService {

  listaTipoHabitacion: TipoHabitacion[] = [];

  constructor() { }

  cargarDataTipoHabitacion(){

    if ( localStorage.getItem( 'ListaTipoHabitacion' ) ) {

      this.listaTipoHabitacion = JSON.parse( localStorage.getItem( 'ListaTipoHabitacion' ) );

    }

  }

  actualizarDataTipoHabitacion(){

    localStorage.setItem( 'ListaTipoHabitacion', JSON.stringify( this.listaTipoHabitacion ) );

  }

  nuevoTipoHhabitacion( tipoHabitacion: TipoHabitacion ){

    this.listaTipoHabitacion.push( tipoHabitacion );
    localStorage.setItem( 'ListaTipoHabitacion', JSON.stringify( this.listaTipoHabitacion ) );

  }

  actualizarTipoHhabitacion( tipoHabitacion: TipoHabitacion, idx: number ){

    for (let tipoHabitacion1 of this.listaTipoHabitacion) {
        if (tipoHabitacion1.id == tipoHabitacion.id) {
            tipoHabitacion1 = tipoHabitacion;
            this.listaTipoHabitacion.splice( idx, 1 );
            this.listaTipoHabitacion.push( tipoHabitacion1 );
            break;
        }
    }

    localStorage.setItem( 'ListaTipoHabitacion', JSON.stringify( this.listaTipoHabitacion ) );
    this.actualizarDataTipoHabitacion();
    return;

  }

  borrarTipoHabitacion( idx: number ){

    this.listaTipoHabitacion.splice( idx, 1 );
    this.actualizarDataTipoHabitacion();

  }

}
