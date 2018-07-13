import { Component, OnInit } from '@angular/core';
import { TipoHabitacionService } from '../../providers/tipo-habitacion.service';
import { HabitacionesService } from '../../providers/habitaciones.service';
import { TipoHabitacion } from '../../interface/tipo-habitacion';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-habitaciones',
  templateUrl: './tipo-habitaciones.component.html',
  styleUrls: ['./tipo-habitaciones.component.css']
})
export class TipoHabitacionesComponent implements OnInit {

  valor: any;

  constructor(private _tHS: TipoHabitacionService, private _hS: HabitacionesService, private toastr: ToastrService,  private router: Router){

    if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
            this.router.navigate(['/login'])
      }

    this._tHS.cargarDataTipoHabitacion();

  }

  ngOnInit() {
  }

  setValor( idx: number ){

    this.valor = idx;

  }

  borrarProducto(){

    let idx = this.valor;
    let totalSumaGet = JSON.parse( localStorage.getItem( 'totalHabitaciones' ));
    let tipoHabitacion: TipoHabitacion = this._tHS.listaTipoHabitacion[idx];

    for (let habitab1 of this._hS.listaHabitaciones) {
        if (habitab1.tipoHabitacion === tipoHabitacion.nombre) {
          this.toastr.error('Este Tipo de Habitación esta en Uso, Elimine las habitaciones que tiene este Tipo de Habitacion', 'ERROR', {
            timeOut: 4000,
            positionClass: 'toast-top-right'
          });
          return;
        }
    }

    if (totalSumaGet >= 0) {
      totalSumaGet -= tipoHabitacion.numeroCuartos;
      localStorage.setItem( 'totalHabitaciones', JSON.stringify( totalSumaGet ) )
    }

    this._tHS.borrarTipoHabitacion( idx );
    this._tHS.cargarDataTipoHabitacion();
    this.toastr.success('Operación Realizada Correctamente', 'Tipo Habitación Eliminada', {
      timeOut: 4000,
      positionClass: 'toast-top-right'
    });

  }

  irAgregrarTipoHabitacion(){

    let totalSum = JSON.parse( localStorage.getItem( 'totalHabitaciones' ));

    if (totalSum >= 300) {
      this.toastr.error('El numero de Habitaciones llego a su limite, No se puede agregar mas', 'ERROR', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      });
      return;
    } else {
      this.router.navigate( ['/tipo-habitacion','nuevo'] )
    }

  }

}
