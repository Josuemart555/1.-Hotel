import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';

@Injectable()
export class LoginService {

  usuario: Usuario;
  public listaUsuarios: Usuario[] = [];

  constructor() { }

  cargarDataUsuarios(){

    if ( localStorage.getItem( 'ListaUsuarios' ) ) {

      this.listaUsuarios = JSON.parse( localStorage.getItem( 'ListaUsuarios' ) );

    }

  }

  actualizarDataUsuario(){

    localStorage.setItem( 'ListaUsuarios', JSON.stringify( this.listaUsuarios ) );

  }

  nuevoUsuario( usuario: Usuario ){

    this.listaUsuarios.push( usuario );
    localStorage.setItem( 'ListaUsuarios', JSON.stringify( this.listaUsuarios ) );

  }

  actualizarUsuario( usuario: Usuario, idx: number ){

    for (let usuario1 of this.listaUsuarios) {
        if (usuario1.id == usuario.id) {
            usuario1 = usuario;
            this.listaUsuarios.splice( idx, 1 );
            this.listaUsuarios.push( usuario1 );
            break;
        }
    }

    localStorage.setItem( 'ListaUsuarios', JSON.stringify( this.listaUsuarios ) );
    this.actualizarDataUsuario();
    return;

  }

  borrarUsuario( idx: number ){

    this.listaUsuarios.splice( idx, 1 );
    this.actualizarDataUsuario();

  }

}
