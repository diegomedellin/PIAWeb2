import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { EventoService } from '../../services/eventos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Aquí se guardan los eventos que vienen del backend
  eventos: any[] = [];

  // Bandera para mostrar spinner o mensajes mientras carga
  cargando = true;

  // Texto de error en caso de que falle el request
  error = '';

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {

    // Apenas carga la vista, pedimos la lista de eventos
    this.eventoService.obtenerEventos().subscribe({
      next: (data: any) => {
        // Si sale bien, guardamos los eventos y apagamos el "cargando"
        this.eventos = data;
        this.cargando = false;
      },
      error: (err) => {
        // Si algo truena, mostramos el error en consola y en pantalla
        console.error(err);
        this.error = 'Error cargando eventos';
        this.cargando = false;
      }
    });
  }
}


