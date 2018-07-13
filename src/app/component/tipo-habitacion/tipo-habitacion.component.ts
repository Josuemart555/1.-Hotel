import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoHabitacion } from '../../interface/tipo-habitacion';
import { TipoHabitacionService } from '../../providers/tipo-habitacion.service';

@Component({
  selector: 'app-tipo-habitacion',
  templateUrl: './tipo-habitacion.component.html',
  styleUrls: ['./tipo-habitacion.component.css']
})
export class TipoHabitacionComponent implements OnInit {

  tipoHabitacion: TipoHabitacion = {
    id: 0,
    nombre: '',
    numeroCuartos: null
  }

  idx: any;

  constructor(
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService,
                private _tHS: TipoHabitacionService
             ){

               if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
                       this.router.navigate(['/login'])
                 }

               this.activatedRoute.params.subscribe( parametros =>{
                 this.idx = parametros['id']
                 if ( this.idx !== 'nuevo' ) {
                   this.tipoHabitacion = this._tHS.listaTipoHabitacion[this.idx]
                 }
               })

              }

  ngOnInit() {
  }

  guardarTipoHabitacioin(){


    for (let tipoHabitacion1 of this._tHS.listaTipoHabitacion) {
        if (tipoHabitacion1.nombre == this.tipoHabitacion.nombre) {
          this.toastr.error('Este tipo de Habitación ya existe pruebe con otro', 'ERROR al Agregar', {
            timeOut: 4000,
            positionClass: 'toast-top-right'
          });
          return;
        }
    }

    if ( this.idx != 'nuevo' ) {
        this._tHS.actualizarTipoHhabitacion( this.tipoHabitacion, this.idx );
        this.toastr.success('Operación Realizada Correctamente', 'Tipo Habitación Actualizada', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
        // this.verificarCategoria( this.idx );
        this.router.navigate( ['/tipo-habitaciones'] )
        return;
    } else {
      this.sumarHabitaciones();
    }
  }

  sumarHabitaciones(){

    let total: number;

    total = this.tipoHabitacion.numeroCuartos;

    let totalSum = JSON.parse( localStorage.getItem( 'totalHabitaciones' ));

    if (totalSum >= 301) {
      this.toastr.error('El numero de Habitaciones llego a su limite', 'ERROR', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    } else {
      totalSum += total;
      if (totalSum >= 301) {
        this.toastr.error('El numero de Habitaciones llego a su limite', 'ERROR', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
        return;
      } else {
        this.tipoHabitacion.id = Math.floor(Math.random() * 1000000);
        this._tHS.nuevoTipoHhabitacion( this.tipoHabitacion );
        this.router.navigate( ['/tipo-habitaciones'] )
        this.toastr.success('Operación Realizada Correctamente', 'Tipo Habitación Agregada', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
        localStorage.setItem( 'totalHabitaciones', JSON.stringify( totalSum ) )
        localStorage.setItem( this.tipoHabitacion.nombre, JSON.stringify( this.tipoHabitacion.numeroCuartos ) )
        this.toastr.info(('El numero de Habitaciones restante es de: ' + (300 - totalSum) ), 'Información', {
          timeOut: 4000,
          positionClass: 'toast-center-center'
        });
      }
    }

  }

}
