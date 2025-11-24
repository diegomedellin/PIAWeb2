// src/app/services/perfil.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient) {}

  getPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updatePerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, data);
  }
}

