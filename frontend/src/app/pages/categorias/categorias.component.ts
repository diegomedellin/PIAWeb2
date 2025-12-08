import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/eventos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  // Aquí guardamos todos los eventos que llegan del backend
  eventos: any[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    // Cuando cargue el componente, pedimos la lista de eventos
    this.eventoService.obtenerEventos().subscribe({
      next: (data: any) => {
        // Si la petición sale bien, guardamos los eventos en la lista
        this.eventos = data;
      },
      error: (err) => {
        // Si algo falla, lo mostramos en consola nomás
        console.error(err);
      }
    });
  }
}


