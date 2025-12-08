import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { EventoService } from '../../services/eventos.service';
import { ReservaService } from '../../services/reservas.service';
import { ComentariosService } from '../../services/comentarios.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  // Evento actual que se mostrará en pantalla
  evento: any = null;

  // Lista de comentarios del evento
  comentarios: any[] = [];

  // Comentario nuevo a escribir
  nuevoComentario: string = '';

  // Controla qué comentario tiene el cuadro de respuesta abierto
  respuestasAbiertas: { [key: string]: boolean } = {};

  // Guarda el texto de la respuesta por comentario
  nuevaRespuesta: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,          // Para obtener el ID de la URL
    private eventoService: EventoService,   // Servicio de eventos
    private reservaService: ReservaService, // Servicio de reservas
    private comentariosService: ComentariosService, // Servicio de comentarios
    public authService: AuthService,        // Para validar login y rol
    private router: Router                  // Para navegar
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID del evento desde la URL
    const id = this.route.snapshot.paramMap.get('id');

    // Si existe el ID, pedimos el evento al backend
    if (id) {
      this.eventoService.obtenerEvento(id).subscribe({
        next: data => {
          this.evento = data;       // Guardamos el evento para mostrarlo
          this.cargarComentarios(); // Cargamos los comentarios relacionados
        },
        error: err => console.error(err)
      });
    }
  }

  // -------------------------------
  // VALIDAR SI EL EVENTO YA PASÓ
  // -------------------------------

  // Revisa si la fecha del evento es anterior a hoy
  private eventoYaPaso(): boolean {
    if (!this.evento?.fecha) return false;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaEvento = new Date(this.evento.fecha);

    // Si la fecha no es válida, mejor no bloquear nada
    if (isNaN(fechaEvento.getTime())) return false;

    fechaEvento.setHours(0, 0, 0, 0);

    return fechaEvento < hoy;
  }

  // -------------------------------
  //     RESERVAR EVENTO
  // -------------------------------
  reservar() {
    if (!this.evento?._id) return;

    // Si el evento ya pasó → no deja reservar
    if (this.eventoYaPaso()) {
      Swal.fire({
        icon: 'info',
        title: 'Evento finalizado',
        text: 'Este evento ya ocurrió, no es posible realizar reservas.'
      });
      return;
    }

    // Si no ha iniciado sesión → lo manda al login
    if (!this.authService.isLogged()) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión para reservar',
        text: 'Necesitas iniciar sesión para hacer una reserva.',
        confirmButtonText: 'Ir a iniciar sesión'
      }).then(() => {
        this.router.navigate(['/iniciar-sesion']);
      });
      return;
    }

    // Si el usuario sí inició sesión → intentamos crear la reserva
    this.reservaService.crearReserva(this.evento._id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Reserva creada correctamente 🎉',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        console.error(err);
        // Si ya existía una reserva, el backend responde error y mostramos mensaje
        Swal.fire({
          icon: 'info',
          title: 'Ya ha reservado',
          text: 'Revise su perfil.'
        });
      }
    });
  }

  // -------------------------------
  //     MANEJO DE COMENTARIOS
  // -------------------------------

  // Carga los comentarios del evento
  cargarComentarios() {
    if (!this.evento?._id) return;

    this.comentariosService.obtenerPorEvento(this.evento._id).subscribe({
      next: (data) => this.comentarios = data,
      error: (err) => console.error("Error cargando comentarios", err)
    });
  }

  // Publicar un comentario nuevo
  enviarComentario() {
    if (!this.nuevoComentario.trim()) return;

    this.comentariosService.crearComentario(this.evento._id, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = ''; // Limpiar input
        this.cargarComentarios();  // Recargar lista
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al publicar comentario',
          text: 'Intenta nuevamente.'
        });
      }
    });
  }

  // Abre/cierra el cuadro de respuesta para un comentario
  toggleRespuesta(id: string) {
    this.respuestasAbiertas[id] = !this.respuestasAbiertas[id];
    if (!this.respuestasAbiertas[id]) {
      this.nuevaRespuesta[id] = ''; // Si se cierra limpiamos la respuesta
    }
  }

  // Enviar una respuesta a un comentario existente
  enviarRespuesta(comentarioId: string) {
    const texto = this.nuevaRespuesta[comentarioId];
    if (!texto?.trim()) return;

    this.comentariosService.responderComentario(comentarioId, texto).subscribe({
      next: () => {
        this.nuevaRespuesta[comentarioId] = ''; // limpiamos el input
        this.respuestasAbiertas[comentarioId] = false; // cerramos panel
        this.cargarComentarios(); // Recargar comentarios
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al responder comentario',
          text: 'Intenta de nuevo.'
        });
      }
    });
  }
}




