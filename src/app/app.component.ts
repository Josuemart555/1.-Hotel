import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrarNavbar: boolean = false;

  constructor(){
    if (JSON.parse( localStorage.getItem( 'usuario' ) ) != null ) {
          this.mostrarNavbar = true;
    }
  }

}
