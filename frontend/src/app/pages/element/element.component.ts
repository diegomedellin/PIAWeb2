import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventoService } from '../../services/eventos.service';
import { ReservaService } from '../../services/reservas.service';
import { ComentariosService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  evento: any = null;

  comentarios: any[] = [];
  nuevoComentario: string = '';

  respuestasAbiertas: { [key: string]: boolean } = {};
  nuevaRespuesta: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private reservaService: ReservaService,
    private comentariosService: ComentariosService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventoService.obtenerEvento(id).subscribe({
        next: data => {
          this.evento = data;
          this.cargarComentarios();
        },
        error: err => console.error(err)
      });
    }
  }

  reservar() {
    if (!this.evento?._id) return;

    this.reservaService.crearReserva(this.evento._id).subscribe({
      next: () => alert("Reserva creada correctamente 🎉"),
      error: (err) => {
        console.error(err);
        alert("Error al reservar ❌");
      }
    });
  }

  // -------------------------------
  //          COMENTARIOS
  // -------------------------------

  cargarComentarios() {
    if (!this.evento?._id) return;

    this.comentariosService.obtenerPorEvento(this.evento._id).subscribe({
      next: (data) => this.comentarios = data,
      error: (err) => console.error("Error cargando comentarios", err)
    });
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim()) return;

    this.comentariosService.crearComentario(this.evento._id, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.cargarComentarios();
      },
      error: (err) => {
        console.error(err);
        alert("Error al publicar comentario");
      }
    });
  }

  toggleRespuesta(id: string) {
    this.respuestasAbiertas[id] = !this.respuestasAbiertas[id];
    if (!this.respuestasAbiertas[id]) {
      this.nuevaRespuesta[id] = '';
    }
  }

  enviarRespuesta(comentarioId: string) {
    const texto = this.nuevaRespuesta[comentarioId];
    if (!texto?.trim()) return;

    this.comentariosService.responderComentario(comentarioId, texto).subscribe({
      next: () => {
        this.nuevaRespuesta[comentarioId] = '';
        this.respuestasAbiertas[comentarioId] = false;
        this.cargarComentarios();
      },
      error: (err) => {
        console.error(err);
        alert("Error al responder comentario");
      }
    });
  }
}


