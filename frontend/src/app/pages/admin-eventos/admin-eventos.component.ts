import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/eventos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-eventos.component.html',
  styleUrls: ['./admin-eventos.component.css']
})
export class AdminEventosComponent implements OnInit {

  eventos: any[] = [];

  nuevoEvento = {
    titulo: '',
    descripcion: '',
    imagen: '',
    fecha: '',
    hora: '',
    locacion: ''
  };

  editando: any = null; // evento a editar

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.obtenerEventos().subscribe({
      next: (data: any) => this.eventos = data,
      error: (err) => console.error(err)
    });
  }

  crearEvento() {
    this.eventoService.crearEvento(this.nuevoEvento).subscribe({
      next: () => {
        alert("Evento creado");
        this.nuevoEvento = { titulo: '', descripcion: '', imagen: '', fecha: '', hora: '', locacion: '' };
        this.cargarEventos();
      },
      error: (err) => console.error(err)
    });
  }

  seleccionarEditar(evento: any) {
    this.editando = { ...evento }; // copiar
  }

  guardarEdicion() {
    this.eventoService.editarEvento(this.editando._id, this.editando).subscribe({
      next: () => {
        alert("Evento actualizado");
        this.editando = null;
        this.cargarEventos();
      },
      error: (err) => console.error(err)
    });
  }

  eliminarEvento(id: string) {
    if(!confirm("¿Seguro que deseas eliminar este evento?")) return;

    this.eventoService.eliminarEvento(id).subscribe({
      next: () => {
        alert("Evento eliminado");
        this.cargarEventos();
      },
      error: (err) => console.error(err)
    });
  }

}
