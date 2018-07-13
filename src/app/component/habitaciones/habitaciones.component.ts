import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../../providers/habitaciones.service';
import { TipoHabitacionService } from '../../providers/tipo-habitacion.service';
import { InquilinosService } from '../../providers/inquilinos.service';
import { ToastrService } from 'ngx-toastr';
import { Habitacion } from '../../interface/habitacion';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  valor: number;

  habitacionSe: any = {
    id: 0,
    tipoHabitacion: '',
    disposicion: '',
    opcionesCama: '',
    precio: 0,
    numeroHabitacion: 0,
    fechaLlagada: null,
    fechaSalida: null
  }
  nombre:any;
  path: string[] = ['nombre'];
  maxDate: any;
  maxDateStr:any;

  constructor(
                private _hS: HabitacionesService,
                private toastr: ToastrService,
                private router: Router,
                private _tHS: TipoHabitacionService,
                private _iS: InquilinosService
             ){

    if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
            this.router.navigate(['/login'])
      }

    this._hS.cargarDataHabitacion();
    this._tHS.cargarDataTipoHabitacion();

  }

  ngOnInit() {
  }

  setValor( idx: number ){

    this.valor = idx;

  }

  borrarHabitacion(){

    let HabRestantes: number;
    let suma1: number;
    let idx = this.valor;
    let habitacion: Habitacion = this._hS.listaHabitaciones[idx];

    for (let inquilino1 of this._iS.listaInquilinos) {
      console.log('entro for inquilino')
        if (inquilino1.habitacion.numeroHabitacion == habitacion.numeroHabitacion) {
          console.log('entro if de no. Hab')
          this.toastr.error('Esta Habitación esta en Uso, Elimine el inquilino que tiene esta Habitacion', 'ERROR', {
            timeOut: 4000,
            positionClass: 'toast-top-right'
          });
          return;
        }
    }

    HabRestantes = JSON.parse( localStorage.getItem( 'HabRestantes '+ habitacion.tipoHabitacion ) );  //Habitaciones Disponibles para crear
    suma1 = HabRestantes + 1;
    localStorage.setItem( ( 'HabRestantes '+ habitacion.tipoHabitacion ), JSON.stringify( suma1 ) );
    this.toastr.info(('El numero de Habitaciones restante ha agregar es de: ' + ( suma1 ) ), 'Información', {
      timeOut: 4000,
      positionClass: 'toast-center-center'
    });

    this._hS.borrarHabitacion( idx );
    this._hS.cargarDataHabitacion();
    this.toastr.success('Operación Realizada Correctamente', 'Habitación Eliminada', {
      timeOut: 4000,
      positionClass: 'toast-top-right'
    });

  }

  MostrarTipohabit(){

    if (this.habitacionSe.tipoHabitacion == '-1') {
      this.nombre = null;
      return;
    }

    for (let tipoHabitacion of this._tHS.listaTipoHabitacion) {
      if ( this.habitacionSe.tipoHabitacion == tipoHabitacion.nombre  ) {
        this.nombre = this.habitacionSe.tipoHabitacion;
      }
    }

  }

}
