// Servicio encargado de toda la lógica de autenticación.
// Aquí manejamos login, registro, guardar token, leer rol del usuario, etc.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})
export class AuthService {

  // URL base donde está corriendo el backend de autenticación
  private apiUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {}

  // ================================
  //            LOGIN
  // ================================
  login(data: { email: string; password: string }): Observable<any> {
    // Enviamos las credenciales al backend
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        // Si el backend devuelve token, lo guardamos en localStorage
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  // ================================
  //         REGISTRO
  // ================================
  registro(data: any): Observable<any> {
    // Aquí solo enviamos la info para registrar al usuario.
    // OJO: No guardamos token en registro (se inicia sesión manualmente después)
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  // ================================
  //        CERRAR SESIÓN
  // ================================
  logout(): void {
    // Quitamos el token para cerrar sesión
    localStorage.removeItem('token');
  }

  // ================================
  //   ¿EL USUARIO ESTÁ LOGGEADO?
  // ================================
  isLogged(): boolean {
    // Básicamente, si hay token → está loggeado
    return !!localStorage.getItem('token');
  }

  // ================================
  //     DECODIFICAR EL JWT
  // ================================
  private getPayload(): any | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // El JWT viene dividido en 3 partes. La del medio es el payload.
      let base64 = token.split('.')[1];

      // Convertimos base64url -> base64 normal
      base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

      // Le agregamos padding si hace falta
      const pad = base64.length % 4;
      if (pad) {
        base64 += '='.repeat(4 - pad);
      }

      // Decodificamos y convertimos a JSON
      const json = atob(base64);
      return JSON.parse(json);

    } catch (e) {
      console.error('Error decodificando token', e);
      return null;
    }
  }

  // ================================
  //        OBTENER ROL DEL USER
  // ================================
  getRol(): string {
    const payload = this.getPayload();

    // El backend usa "rol", pero ponemos "role" por si acaso.
    return payload?.rol || payload?.role || '';
  }

  // ================================
  //     ¿ES ADMIN EL USUARIO?
  // ================================
  isAdmin(): boolean {
    return this.getRol() === 'admin';
  }
}




