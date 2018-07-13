import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../interface/usuario';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = {
    username: '',
    id: 0,
    password: ''
  }

  constructor(private router: Router,
              private appcom: AppComponent
              ) {

    if ( JSON.parse( localStorage.getItem('usuario') ) == null || JSON.parse( localStorage.getItem('usuario') ) == '' ) {
            this.router.navigate(['/login'])
      } else {
          this.usuario = JSON.parse(localStorage.getItem('usuario'))
          this.appcom.mostrarNavbar = true;
      }

  }

  ngOnInit() {
  }

}
