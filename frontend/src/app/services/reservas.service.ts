import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api = 'http://localhost:4000/api/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(eventoId: string) {
  return this.http.post(
    'http://localhost:4000/api/reservas',
    { evento: eventoId }  // <- obligatorio
  );
}



obtenerMisReservas() {
    return this.http.get<any[]>('http://localhost:4000/api/reservas/mine');
}


  cancelarReserva(id: string) {
    return this.http.put(this.api + "/cancel/" + id, {});
  }
}

