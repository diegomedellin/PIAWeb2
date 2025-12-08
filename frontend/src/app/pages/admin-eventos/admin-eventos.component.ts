import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/eventos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-eventos.component.html',
  styleUrls: ['./admin-eventos.component.css']
})
export class AdminEventosComponent implements OnInit {

  // Lista donde se guardan los eventos traídos del backend
  eventos: any[] = [];

  // Objeto base para crear un nuevo evento
  nuevoEvento = {
    titulo: '',
    descripcion: '',
    imagen: '',
    fecha: '',
    hora: '',
    locacion: ''
  };

  // Si contiene un evento, significa que estamos editando
  editando: any = null;

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    // Cuando entra a la pantalla, cargamos los eventos existentes
    this.cargarEventos();
  }

  cargarEventos() {
    // Pedimos los eventos al backend y los guardamos en la lista
    this.eventoService.obtenerEventos().subscribe({
      next: (data: any) => this.eventos = data,
      error: (err) => console.error(err)
    });
  }

  // Función que revisa si la fecha ingresada ya pasó
  private esFechaPasada(fechaStr: string): boolean {
    if (!fechaStr) return false;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(fechaStr);
    fecha.setHours(0, 0, 0, 0);

    // Si la fecha del evento es menor que hoy, significa que ya pasó
    return fecha < hoy;
  }

  crearEvento() {

    // Validación simple para que no creen eventos en fechas que ya ocurrieron
    if (this.esFechaPasada(this.nuevoEvento.fecha)) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha inválida',
        text: 'No puedes agendar eventos en fechas pasadas.'
      });
      return;
    }

    // Si todo está bien, enviamos el nuevo evento al backend
    this.eventoService.crearEvento(this.nuevoEvento).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Evento creado',
          showConfirmButton: false,
          timer: 1500
        });

        // Limpiamos el formulario
        this.nuevoEvento = { titulo: '', descripcion: '', imagen: '', fecha: '', hora: '', locacion: '' };

        // Volvemos a cargar la lista
        this.cargarEventos();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear evento',
          text: 'Intenta de nuevo más tarde.'
        });
      }
    });
  }

  seleccionarEditar(evento: any) {
    // Copiamos el evento seleccionado para editarlo sin modificarlo en la tabla
    this.editando = { ...evento };
  }

  guardarEdicion() {

    // También evitamos que editen un evento y le pongan una fecha pasada
    if (this.esFechaPasada(this.editando.fecha)) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha inválida',
        text: 'No puedes cambiar el evento a una fecha pasada.'
      });
      return;
    }

    // Mandamos al backend el evento ya modificado
    this.eventoService.editarEvento(this.editando._id, this.editando).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Evento actualizado',
          showConfirmButton: false,
          timer: 1500
        });

        // Quitamos el modo edición
        this.editando = null;

        // Refrescamos la lista
        this.cargarEventos();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar evento',
          text: 'Revisa los datos e intenta de nuevo.'
        });
      }
    });
  }

  eliminarEvento(id: string) {
    // Confirmación antes de borrar
    Swal.fire({
      icon: 'warning',
      title: '¿Eliminar evento?',
      text: 'Esta acción también eliminará las reservas relacionadas.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.eventoService.eliminarEvento(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Evento eliminado',
            showConfirmButton: false,
            timer: 1500
          });

          // Actualizamos la lista después de borrar
          this.cargarEventos();
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar evento',
            text: 'Intenta nuevamente.'
          });
        }
      });
    });
  }

}



