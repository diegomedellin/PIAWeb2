import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../services/eventos.service';
import { ReservaService } from '../../services/reservas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  evento: any = null;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.eventoService.obtenerEvento(id!).subscribe({
      next: data => this.evento = data,
      error: err => console.error(err)
    });
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
}


