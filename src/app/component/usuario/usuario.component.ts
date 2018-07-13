import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface/usuario';
import { LoginService } from '../../providers/login.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = {
    id: 0,
    username: '',
    password: '',
    role: ''
  }

  idx: any;
  type: string = 'password';
  mostrarPas: boolean = false;

  constructor( private _lS: LoginService,
               private router: Router,
               private toastr: ToastrService,
             private activatedRoute: ActivatedRoute ){

               if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
                       this.router.navigate(['/login'])
                 }

                 this.activatedRoute.params.subscribe( parametros =>{
                    this.idx = parametros['id']
                    if ( this.idx !== 'nuevo' ) {
                      this.usuario = this._lS.listaUsuarios[this.idx]
                    }
                  })

               }

  ngOnInit() {
  }

  guardarUsuario(){

    if (this.idx != 'nuevo') {
      this._lS.actualizarUsuario( this.usuario, this.idx );
      this.router.navigate( ['/usuarios'] )
      this.toastr.success('Operación Realizada Correctamente', 'Usuario Actualizado', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
    } else {
      this.usuario.id = Math.floor(Math.random() * 1000000);
      this._lS.nuevoUsuario( this.usuario );
      this.router.navigate( ['/usuarios'] )
      this.toastr.success('Operación Realizada Correctamente', 'Usuario Agregada', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
    }

  }

  mostrarPassword(){

    this.mostrarPas = !this.mostrarPas;

    if (this.mostrarPas) {
        this.type = 'text'
    } else {
      this.type = 'password'
    }

  }

}
