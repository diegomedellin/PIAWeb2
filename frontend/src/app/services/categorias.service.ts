import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://localhost:4000/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
