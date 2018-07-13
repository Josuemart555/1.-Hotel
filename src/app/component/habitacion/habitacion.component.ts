import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../../interface/habitacion';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import {BrowserModule} from '@angular/platform-browser'
import { Daterangepicker } from 'ng2-daterangepicker';
import { HabitacionesService } from '../../providers/habitaciones.service';
import { TipoHabitacionService } from '../../providers/tipo-habitacion.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {

  habitacion: Habitacion = {
    id: 0,
    tipoHabitacion: '',
    disposicion: '',
    opcionesCama: '',
    precio: 0,
    numeroHabitacion: 0,
    fechaLlagada: null,
    fechaSalida: null
  }

  idx: any;
  habitacionesACrear: number = 1;
  mostrar: boolean = false;

  constructor(  private _hS: HabitacionesService,
                private _tHS: TipoHabitacionService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService
             ){

               if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
                       this.router.navigate(['/login'])
               }

               this._hS.cargarDataHabitacion();
               this._tHS.cargarDataTipoHabitacion();

               this.activatedRoute.params.subscribe( parametros =>{
                  this.idx = parametros['id']
                  if ( this.idx !== 'nuevo' ) {
                    this.habitacion = this._hS.listaHabitaciones[this.idx]
                  }
                })

             }

  ngOnInit() {
  }

  guardarHabitaciones(){

    if (this.idx != 'nuevo') {
      this._hS.actualizarhabitacion( this.habitacion, this.idx );
      this.router.navigate(['/habitaciones']);
      this.toastr.success('Operación Realizada Correctamente', 'Habitación Actualizada', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    } else {
      this.generarHabitaciones();
    }
  }

  viewMoreRoom(){

    if (this.mostrar == false) {
        this.mostrar = true;
    } else {
      this.mostrar = false;
    }

  }

  generarHabitaciones(){
    let HabRestantes: number;
    let TipoHCreadas = JSON.parse(localStorage.getItem( this.habitacion.tipoHabitacion )); //Total de las Habitaciones

    if ( localStorage.getItem( 'HabRestantes '+ this.habitacion.tipoHabitacion ) != null) {
      HabRestantes = JSON.parse( localStorage.getItem( 'HabRestantes '+ this.habitacion.tipoHabitacion ) );  //Habitaciones Disponibles para crear
    }else{
      HabRestantes = TipoHCreadas;
    }


    if ( this.habitacionesACrear <= HabRestantes ) {
        HabRestantes -= this.habitacionesACrear;
        if (HabRestantes < 0) {
          this.toastr.error('Limite de habitaciones superada, intente con un numero menor', 'ERROR', {
            timeOut: 4000,
            positionClass: 'toast-top-right'
          });
          return;
        } else {
          localStorage.setItem( ('HabRestantes '+ this.habitacion.tipoHabitacion), JSON.stringify(HabRestantes));
          this.toastr.info(('El numero de Habitaciones restante ha agregar es de: ' + (HabRestantes) ), 'Información', {
            timeOut: 4000,
            positionClass: 'toast-center-center'
          });
        }
    } else {
      this.toastr.error('Limite de habitaciones superada', 'ERROR', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }

    if (this.mostrar == true) {
      for (let tipoHabitacion1 of this._tHS.listaTipoHabitacion) {
          if (true) {

          }
      }
      for (let i = 0; i < this.habitacionesACrear; i++) {
        let habitacionNew: Habitacion = {
          id: Math.floor(Math.random() * 1000000),
          tipoHabitacion: this.habitacion.tipoHabitacion,
          disposicion: 'Si',
          opcionesCama: this.habitacion.opcionesCama,
          precio: this.habitacion.precio,
          numeroHabitacion: Math.floor(Math.random() * 300),
          fechaLlagada: null,
          fechaSalida: null
        }

        this._hS.nuevahabitacion( habitacionNew );
      }
      this.router.navigate(['/habitaciones']);
      this.toastr.success('Operación Realizada Correctamente', 'Habitaciones Agregadas', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    } else {
      this.habitacion.id = Math.floor(Math.random() * 1000000);
      this.habitacion.numeroHabitacion = Math.floor(Math.random() * 300);
      this.habitacion.disposicion = 'Si';
      this._hS.nuevahabitacion( this.habitacion );
      this.router.navigate(['/habitaciones']);
      this.toastr.success('Operación Realizada Correctamente', 'Habitación Agregada', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }

  }

}
