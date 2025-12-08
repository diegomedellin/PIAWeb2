// Servicio encargado de manejar todas las peticiones relacionadas con eventos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // lo deja disponible para toda la aplicación
})
export class EventoService {

  // URL base del backend para todo lo relacionado con eventos
  private api = 'http://localhost:4000/api/eventos';

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  obtenerEventos() {
    return this.http.get(this.api); // GET /eventos
  }

  // Obtener un solo evento por su ID
  obtenerEvento(id: string) {
    return this.http.get(`${this.api}/${id}`); // GET /eventos/:id
  }

  // Crear un nuevo evento (solo admin)
  crearEvento(body: any) {
    return this.http.post(this.api, body); // POST /eventos
  }

  // Editar un evento existente por ID
  editarEvento(id: string, body: any) {
    return this.http.put(`${this.api}/${id}`, body); // PUT /eventos/:id
  }

  // Eliminar un evento por ID
  eliminarEvento(id: string) {
    return this.http.delete(`${this.api}/${id}`); // DELETE /eventos/:id
  }

}



