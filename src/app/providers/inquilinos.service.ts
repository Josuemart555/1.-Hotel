import { Injectable } from '@angular/core';
import { Inquilino } from '../interface/inquilino';

@Injectable()
export class InquilinosService {

  listaInquilinos: Inquilino[] = [];

  constructor() { }

  cargarDataInquilino(){

    if ( localStorage.getItem( 'ListaInquilinos' ) ) {

      this.listaInquilinos = JSON.parse( localStorage.getItem( 'ListaInquilinos' ) );

    }

  }

  actualizarDataInquilino(){

    localStorage.setItem( 'ListaInquilinos', JSON.stringify( this.listaInquilinos ) );

  }

  nuevoInquilino( inquilino: Inquilino ){

    this.listaInquilinos.push( inquilino );
    localStorage.setItem( 'ListaInquilinos', JSON.stringify( this.listaInquilinos ) );

  }

  actualizarInquilino( inquilino: Inquilino, idx: number ){

    for (let inquilino1 of this.listaInquilinos) {
        if (inquilino1.id == inquilino.id) {
            inquilino1 = inquilino;
            this.listaInquilinos.splice( idx, 1 );
            this.listaInquilinos.push( inquilino1 );
            break;
        }
    }

    localStorage.setItem( 'ListaInquilinos', JSON.stringify( this.listaInquilinos ) );
    this.actualizarDataInquilino();
    return;

  }

  borrarInquilino( idx: number ){

    this.listaInquilinos.splice( idx, 1 );
    this.actualizarDataInquilino();

  }

}
