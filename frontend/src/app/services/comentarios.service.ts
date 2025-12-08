// Servicio encargado de manejar todas las peticiones HTTP
// relacionadas con los comentarios y respuestas de un evento.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la app
})
export class ComentariosService {

  // URL base del backend para las rutas de comentarios
  private apiUrl = 'http://localhost:4000/api/comentarios';

  constructor(private http: HttpClient) { }

  // Obtiene todos los comentarios que pertenecen a un evento específico
  obtenerPorEvento(eventoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${eventoId}`);
  }

  // Crea un nuevo comentario dentro de un evento
  // Se envía el texto y el backend se encarga de asignar el usuario
  crearComentario(eventoId: string, texto: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventoId}`, { texto });
  }

  // Envía una respuesta a un comentario ya existente
  responderComentario(comentarioId: string, texto: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/responder/${comentarioId}`, { texto });
  }
}

