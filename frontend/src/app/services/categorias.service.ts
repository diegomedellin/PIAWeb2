// Servicio para manejar todo lo relacionado con categorías desde el frontend.
// Aquí hacemos las peticiones al backend para obtener la lista de categorías.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // hace que el servicio esté disponible en toda la app
})
export class CategoriasService {

  // URL base del backend donde están las rutas de categorías
  private apiUrl = 'http://localhost:4000/api/categorias';

  constructor(private http: HttpClient) {}

  // Trae todas las categorías desde el backend
  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

