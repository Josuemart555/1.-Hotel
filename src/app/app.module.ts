import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap';

//Routes
import { APP_ROUTING } from './app.routing';

//service
import { LoginService } from './providers/login.service';
import { AuthGuardLogiServiceService } from './providers/auth-guard-logi-service.service';
import { HabitacionesService } from './providers/habitaciones.service';
import { TipoHabitacionService } from './providers/tipo-habitacion.service';
import { InquilinosService } from './providers/inquilinos.service';
import { BitacoraService } from './providers/bitacora.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { HabitacionComponent } from './component/habitacion/habitacion.component';
import { HabitacionesComponent } from './component/habitaciones/habitaciones.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SortingPipe } from './pipes/sorting.pipe';
import { TipoHabitacionComponent } from './component/tipo-habitacion/tipo-habitacion.component';
import { TipoHabitacionesComponent } from './component/tipo-habitaciones/tipo-habitaciones.component';
import { InquilinosComponent } from './component/inquilinos/inquilinos.component';
import { InquilinoComponent } from './component/inquilino/inquilino.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    HabitacionComponent,
    HabitacionesComponent,
    NavbarComponent,
    SortingPipe,
    TipoHabitacionComponent,
    TipoHabitacionesComponent,
    InquilinosComponent,
    InquilinoComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AlertModule.forRoot()
  ],
  providers: [
    LoginService,
    AuthGuardLogiServiceService,
    HabitacionesService,
    TipoHabitacionService,
    InquilinosService,
    BitacoraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
