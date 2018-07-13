import { Habitacion } from './habitacion';
import { Usuario } from './usuario';

export interface Inquilino {

  id: number;
  nombres: string;
  apellidos: string;
  edad: number;
  fechaLlega: Date;
  fechaSalida: Date;
  habitacion: Habitacion;
  usuario: Usuario;

}
