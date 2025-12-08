// Servicio encargado de manejar todo lo relacionado con el perfil del usuario
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // hace que el servicio esté disponible en toda la app
})
export class PerfilService {

  // URL base del backend para las rutas del perfil del usuario
  private apiUrl = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener los datos del usuario loggeado (el backend usa /me)
  getPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  // Actualizar los datos del perfil mandando la info al backend
  updatePerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, data);
  }
}


