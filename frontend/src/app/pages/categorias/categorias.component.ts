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

  eventos: any[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.eventoService.obtenerEventos().subscribe({
      next: (data: any) => {
        this.eventos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

