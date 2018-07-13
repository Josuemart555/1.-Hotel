import { Injectable } from '@angular/core';
import { Bitacora } from '../interface/bitacora';

@Injectable()
export class BitacoraService {

  listaBitacora: Bitacora[] = [];

  constructor() { }

  cargarDataBitacora(){

    if ( localStorage.getItem( 'ListaBitacora' ) ) {

      this.listaBitacora = JSON.parse( localStorage.getItem( 'ListaBitacora' ) );

    }

  }

  actualizarDataBitacora(){

    localStorage.setItem( 'ListaBitacora', JSON.stringify( this.listaBitacora ) );

  }

  nuevaBitacora( bitacora: Bitacora ){

    this.listaBitacora.push( bitacora );
    localStorage.setItem( 'ListaBitacora', JSON.stringify( this.listaBitacora ) );

  }

  actualizarBitacora( bitacora: Bitacora, idx: number ){

    for (let bitacora1 of this.listaBitacora) {
        if (bitacora1.id == bitacora.id) {
            bitacora1 = bitacora;
            this.listaBitacora.splice( idx, 1 );
            this.listaBitacora.push( bitacora1 );
            break;
        }
    }

    localStorage.setItem( 'ListaBitacora', JSON.stringify( this.listaBitacora ) );
    this.actualizarDataBitacora();
    return;

  }

  borrarBitacora( idx: number ){

    this.listaBitacora.splice( idx, 1 );
    this.actualizarDataBitacora();

  }

}
