import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private api = 'http://localhost:4000/api/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos() {
    return this.http.get(this.api);
  }

  obtenerEvento(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  crearEvento(body: any) {
    return this.http.post(this.api, body);
    }

    editarEvento(id: string, body: any) {
    return this.http.put(`${this.api}/${id}`, body);
    }

    eliminarEvento(id: string) {
    return this.http.delete(`${this.api}/${id}`);
    }


}


