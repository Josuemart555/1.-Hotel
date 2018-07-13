import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inquilino } from '../../interface/inquilino';
import { InquilinosService } from '../../providers/inquilinos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.component.html',
  styleUrls: ['./inquilinos.component.css']
})
export class InquilinosComponent implements OnInit {

  valor: number;
  idHabitacion: number = 0;

  constructor(private _iS: InquilinosService, private toastr: ToastrService, private router: Router ) {

    if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
            this.router.navigate(['/login'])
    }

    this._iS.cargarDataInquilino();

  }

  ngOnInit() {
  }

  setValor( idx: number ){

    this.valor = idx;

  }

  borrarInquilino(){
    let idx = this.valor;

    this.idHabitacion = this._iS.listaInquilinos[idx].habitacion.id;

    this._iS.borrarInquilino( idx );
    this._iS.cargarDataInquilino();
    this.toastr.success('Operación Realizada Correctamente', 'Tipo Habitación Eliminada', {
      timeOut: 4000,
      positionClass: 'toast-top-right'
    });
    this.disponibleHablitacion();

  }

  disponibleHablitacion( ){

    let listaHabitaciones = JSON.parse(localStorage.getItem('ListaHabitaciones'))
    let idx = this.valor;
    let encontroRelacion: boolean = false;

    for (let i = 0; i < this._iS.listaInquilinos.length; i++) {
        this._iS.listaInquilinos[i];
        if (this._iS.listaInquilinos[i].habitacion.id == this._iS.listaInquilinos[idx].habitacion.id) {
            encontroRelacion = true;
            break;
        }
    }

    if (!encontroRelacion) {
      for (let i = 0; i < listaHabitaciones.length; i++) {
          listaHabitaciones[i];
          if (listaHabitaciones[i].id == this.idHabitacion) {
              listaHabitaciones[i].disposicion = 'Si';
              localStorage.setItem('ListaHabitaciones', JSON.stringify(listaHabitaciones));
              break;
          }
      }
    }

  }

}
