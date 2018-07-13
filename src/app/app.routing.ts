import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { AuthGuardLogiServiceService } from './providers/auth-guard-logi-service.service';
import { HabitacionesComponent } from './component/habitaciones/habitaciones.component';
import { HabitacionComponent } from './component/habitacion/habitacion.component';
import { TipoHabitacionesComponent } from './component/tipo-habitaciones/tipo-habitaciones.component';
import { TipoHabitacionComponent } from './component/tipo-habitacion/tipo-habitacion.component';
import { InquilinosComponent } from './component/inquilinos/inquilinos.component';
import { InquilinoComponent } from './component/inquilino/inquilino.component';

const APP_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
 },
  {
    path: 'habitaciones',
    component: HabitacionesComponent
 },
  {
     path: 'usuarios',
     component: UsuariosComponent
 },
  {
    path: 'tipo-habitaciones',
    component: TipoHabitacionesComponent
   },
  {
    path: 'inquilinos',
    component: InquilinosComponent
   },
  {
    path: 'inquilino/:id',
    component: InquilinoComponent
  },
  {
    path: 'tipo-habitacion/:id',
    component: TipoHabitacionComponent
   },
  {
    path: 'habitacion/:id',
     component: HabitacionComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AuthGuardLogiServiceService ]
   },
  {
    path: 'usuario/:id',
    component: UsuarioComponent
   },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
