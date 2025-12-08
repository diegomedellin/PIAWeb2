import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  // URL base del backend para todo lo relacionado con reservas
  private api = 'http://localhost:4000/api/reservas';

  constructor(private http: HttpClient) {}

  // Crear una reserva enviando el ID del evento al backend
  crearReserva(eventoId: string) {
    return this.http.post(
      'http://localhost:4000/api/reservas',   // endpoint para crear reserva
      { evento: eventoId }                   // el backend espera el campo "evento"
    );
  }

  // Obtener todas las reservas del usuario que inició sesión
  obtenerMisReservas() {
    return this.http.get<any[]>('http://localhost:4000/api/reservas/mine');
  }

  // Cancelar una reserva usando su ID
  cancelarReserva(id: string) {
    return this.http.put(this.api + "/cancel/" + id, {}); // enviamos un body vacío
  }
}


