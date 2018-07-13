import { Injectable } from '@angular/core';
import { Habitacion } from '../interface/habitacion';

@Injectable()
export class HabitacionesService {

  listaHabitaciones: Habitacion[] = [];

  constructor() { }

  cargarDataHabitacion(){

    if ( localStorage.getItem( 'ListaHabitaciones' ) ) {

      this.listaHabitaciones = JSON.parse( localStorage.getItem( 'ListaHabitaciones' ) );

    }

  }

  actualizarDatahabitacion(){

    localStorage.setItem( 'ListaHabitaciones', JSON.stringify( this.listaHabitaciones ) );

  }

  nuevahabitacion( habitacion: Habitacion ){

    this.listaHabitaciones.push( habitacion );
    localStorage.setItem( 'ListaHabitaciones', JSON.stringify( this.listaHabitaciones ) );

  }

  actualizarhabitacion( habitacion: Habitacion, idx: number ){

    for (let habitacion1 of this.listaHabitaciones) {
        if (habitacion1.id == habitacion.id) {
            habitacion1 = habitacion;
            this.listaHabitaciones.splice( idx, 1 );
            this.listaHabitaciones.push( habitacion1 );
            break;
        }
    }

    localStorage.setItem( 'ListaHabitaciones', JSON.stringify( this.listaHabitaciones ) );
    this.actualizarDatahabitacion();
    return;

  }

  borrarHabitacion( idx: number ){

    this.listaHabitaciones.splice( idx, 1 );
    this.actualizarDatahabitacion();

  }

}
