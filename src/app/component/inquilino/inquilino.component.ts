import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inquilino } from '../../interface/inquilino';
import { Bitacora } from '../../interface/bitacora';
import { Habitacion } from '../../interface/habitacion';
import { TipoHabitacion } from '../../interface/tipo-habitacion';
import { InquilinosService } from '../../providers/inquilinos.service';
import { BitacoraService } from '../../providers/bitacora.service';
import { HabitacionesService } from '../../providers/habitaciones.service';
import { TipoHabitacionService } from '../../providers/tipo-habitacion.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inquilino',
  templateUrl: './inquilino.component.html',
  styleUrls: ['./inquilino.component.css']
})
export class InquilinoComponent implements OnInit {

  inquilino: Inquilino = {
    id: 0,
    nombres: '',
    apellidos: '',
    edad: null,
    fechaLlega: null,
    fechaSalida: null,
    habitacion: {
      id: 0,
      tipoHabitacion: '',
      disposicion: '',
      opcionesCama: '',
      precio: 0,
      numeroHabitacion: 0,
      fechaLlagada: null,
      fechaSalida: null
    },
    usuario: {
      password: '',
      username: '',
      id: 0,
      role: ''
    }
  }

  habitacion: Habitacion ={
    id: 0,
    tipoHabitacion: '',
    disposicion: '',
    opcionesCama: '',
    precio: 0,
    numeroHabitacion: 0,
    fechaLlagada: null,
    fechaSalida: null
  }

  tipoHabitacion: TipoHabitacion = {
    id: 0,
    nombre: '',
    numeroCuartos: null
  }

  bitacora: Bitacora = {
    id: 0,
    inquilino: {
      id: 0,
      nombres: '',
      apellidos: '',
      edad: null,
      fechaLlega: null,
      fechaSalida: null,
      habitacion: {
        id: 0,
        tipoHabitacion: '',
        disposicion: '',
        opcionesCama: '',
        precio: 0,
        numeroHabitacion: 0,
        fechaLlagada: null,
        fechaSalida: null
      },
      usuario: {
        password: '',
        username: '',
        id: 0,
        role: ''
      }
    }
  }

  idx: any;
  tipoHab: any;
  numHa: number = 0;
  listaNumeroHabitacion: number[] = [];

  minDate : any ;
  todayStr:any;
  today:any;

  constructor(
    private _iS: InquilinosService,
    private _bS: BitacoraService,
    private _hS: HabitacionesService,
    private _tHS: TipoHabitacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {

    if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
            this.router.navigate(['/login'])
      }

      this.minDate = new Date().toISOString();
      this.today = new Date();
      this.today.setHours(0,0,0);
      this.todayStr  = this.today.toISOString().substring(0,10);

    this._tHS.cargarDataTipoHabitacion();
    this._hS.cargarDataHabitacion();

    this.activatedRoute.params.subscribe( parametros =>{
       this.idx = parametros['id']
       if ( this.idx !== 'nuevo' ) {
         this.inquilino = this._iS.listaInquilinos[this.idx]
         for (let tipoha1 of this._tHS.listaTipoHabitacion) {
             if (this._iS.listaInquilinos[this.idx].habitacion.tipoHabitacion == tipoha1.nombre) {
                 tipoha1.id = this.tipoHabitacion.id;
                 this.mostrarNumeroCuarto();
             }
         }
         for (let habita1 of this._hS.listaHabitaciones) {
             if (this._iS.listaInquilinos[this.idx].habitacion.id == habita1.id) {
                 this.numHa = habita1.numeroHabitacion;
             }
         }
         this.inquilino.habitacion.numeroHabitacion = this._iS.listaInquilinos[this.idx].habitacion.numeroHabitacion;
       }
     })

  }

  ngOnInit() {
  }

  guardarInquilino(){

   let date= new Date();
   let dia:any
   let mes:any
   let año:any
   let today:any

   dia = date.getDate();
   mes = date.getMonth() + 1;
   año = date.getFullYear();

   if (mes < 10) {
       mes = "0"+mes
       console.log(mes)
   }
   if (dia < 10) {
       dia = "0"+dia
       console.log(dia)
   }
   today = año + "-" + mes + "-"+ dia

    if (this.inquilino.fechaLlega == null) {
      this.toastr.error('Debe de ingresar la fecha de Llegada', 'ERROR',{
          timeOut: 2000,
          positionClass: 'toast-top-right',
        });
        return;
    }

    if (this.inquilino.fechaSalida == null) {
      this.toastr.error('Debe de ingresar la fecha de Salida', 'ERROR',{
          timeOut: 2000,
          positionClass: 'toast-top-right',
        });
        return;
    }

    if (this.inquilino.fechaLlega > this.inquilino.fechaSalida) {
      this.toastr.error('La fecha de llegada no debe ser mayor a la de salida', 'ERROR',{
          timeOut: 2000,
          positionClass: 'toast-top-right',
        });
        return;
    }

    if (this.tipoHabitacion.id == 0) {
      this.toastr.error('Debe elegir el Tipo de Habitacion', 'ERROR',{
          timeOut: 2000,
          positionClass: 'toast-top-right',
        });
        return;
    }

    if (this.numHa == 0) {
      this.toastr.error('Debe elegir un numero de habitacion', 'ERROR',{
          timeOut: 2000,
          positionClass: 'toast-top-right',
        });
        return;
    }

    if (this.inquilino.fechaLlega < today) {
       this.toastr.error('No puede elegir una fecha pasada, a la actual', 'ERROR', {
         timeOut: 2000,
         positionClass: 'toast-top-right'
       });
       return;
     }

    if (this.idx != 'nuevo') {
      this._iS.actualizarInquilino( this.inquilino, this.idx );
      this.router.navigate(['/inquilinos']);
      this.toastr.success('Operación Realizada Correctamente', 'Inquilino Actualizada', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    } else {
      this.inquilino.id = Math.floor(Math.random() * 1000000);
      this.inquilino.habitacion.fechaLlagada = this.inquilino.fechaLlega;
      this.inquilino.habitacion.fechaSalida = this.inquilino.fechaSalida;

      let tipoHabit: any = '';
      for (let i = 0; i < this._tHS.listaTipoHabitacion.length; i++) {
          let tipoHabitacion1 = this._tHS.listaTipoHabitacion[i];
          if (tipoHabitacion1.id == this.tipoHabitacion.id) {
              tipoHabit = tipoHabitacion1;
          }
      }

      for (let i = 0; i < this._hS.listaHabitaciones.length; i++) {
          let habitacion = this._hS.listaHabitaciones[i];
          if (habitacion.numeroHabitacion == this.numHa) {
              this.inquilino.habitacion.opcionesCama = habitacion.opcionesCama;
              this.inquilino.habitacion.precio = habitacion.precio;
              this.inquilino.habitacion.tipoHabitacion = habitacion.tipoHabitacion;
              this.inquilino.habitacion.id = habitacion.id;
          }
      }
      this.disponibleHablitacion( this.inquilino.habitacion.id );

      for (let i = 0; i < this._hS.listaHabitaciones.length; i++) {
          let habitacion2 = this._hS.listaHabitaciones[i];
          if (habitacion2.numeroHabitacion == this.numHa) {
              if (this._hS.listaHabitaciones[i].fechaSalida < this.inquilino.fechaLlega) {
                  if (habitacion2.disposicion == 'No') {
                    this.toastr.error('Esta numero de habitacion ya esta ocupada', 'ERROR',{
                      timeOut: 2000,
                      positionClass: 'toast-top-right',
                    });
                    return;
                  }
              }
          }
      }
      let usuar = JSON.parse( localStorage.getItem('usuario') );
      this.inquilino.usuario = usuar;
      this.bitacora.id = Math.floor(Math.random() * 1000000000);
      this.bitacora.inquilino = this.inquilino;
      this._bS.nuevaBitacora( this.bitacora );
      this.inquilino.habitacion.numeroHabitacion = Number(this.numHa);
      this.inquilino.habitacion.disposicion = 'No';
      this._iS.nuevoInquilino( this.inquilino );
      this.router.navigate(['/inquilinos']);
      this.toastr.success('Operación Realizada Correctamente', 'Inquilino Agregardo', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }
  }

  mostrarNumeroCuarto(){

    let tipoH: any = null;
    this.listaNumeroHabitacion = [];

    for (let i = 0; i < this._tHS.listaTipoHabitacion.length; i++) {
        let tipoHabitacion1 = this._tHS.listaTipoHabitacion[i];
        if (tipoHabitacion1.id == this.tipoHabitacion.id) {
            tipoH = tipoHabitacion1;
        }
    }

    for (let i = 0; i < this._hS.listaHabitaciones.length; i++) {
        let habita = this._hS.listaHabitaciones[i];
        if (habita.tipoHabitacion == tipoH.nombre) {
            this.listaNumeroHabitacion.push( habita.numeroHabitacion )
        }
    }

  }

  disponibleHablitacion( id: number ){

    let listaHabitaciones = JSON.parse(localStorage.getItem('ListaHabitaciones'))

    for (let i = 0; i < listaHabitaciones.length; i++) {
        listaHabitaciones[i];
        if (listaHabitaciones[i].id == this.inquilino.habitacion.id) {
            listaHabitaciones[i].disposicion = 'No';
            listaHabitaciones[i].fechaLlega = this.inquilino.fechaLlega;
            listaHabitaciones[i].fechaSalida = this.inquilino.fechaSalida;
            localStorage.setItem('ListaHabitaciones', JSON.stringify(listaHabitaciones));

        }
    }

  }

}
