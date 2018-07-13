import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../providers/login.service';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  valor: number;

  constructor(
     private _lS: LoginService,
     private toastr: ToastrService,
     private router: Router
   ){

     if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
             this.router.navigate(['/login'])
       }

    this._lS.cargarDataUsuarios();

  }

  ngOnInit() {
  }

  setValor( idx: number ){

    this.valor = idx;

  }

  borrarUsuario(){

    let idx = this.valor;
    let us: any =  JSON.parse( localStorage.getItem('usuario') );

    for (let i = 0; i < this._lS.listaUsuarios.length; i++) {
        this._lS.listaUsuarios[i];
        if (this._lS.listaUsuarios[i] == this._lS.listaUsuarios[idx]) {
            if ( us.username == this._lS.listaUsuarios[i].username) {
              this.toastr.error('No puedes eliminar este usuario, es el que esta en uso', 'ERROR', {
                timeOut: 4000,
                positionClass: 'toast-top-right'
              });
              return;
            } else {
              this._lS.borrarUsuario( idx );
              this._lS.cargarDataUsuarios();
              this.toastr.success('Operación Realizada Correctamente', 'Usuario Eliminado', {
                timeOut: 4000,
                positionClass: 'toast-top-right'
              });
            }
        }
    }


  }

}
