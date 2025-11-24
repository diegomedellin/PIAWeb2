// src/app/services/comentarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = 'http://localhost:4000/api/comentarios';

  constructor(private http: HttpClient) { }

  obtenerPorEvento(eventoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${eventoId}`);
  }

  crearComentario(eventoId: string, texto: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventoId}`, { texto });
  }

  responderComentario(comentarioId: string, texto: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/responder/${comentarioId}`, { texto });
  }
}
