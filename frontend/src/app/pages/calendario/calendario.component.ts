import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaService } from '../../services/reservas.service';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  // Opciones que usa el calendario de FullCalendar
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],     // Plugin para mostrar vista mensual
    initialView: 'dayGridMonth',  // Vista por defecto
    events: []                    // Aquí van las reservas transformadas en eventos
  };

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    // Apenas carga el componente, pedimos las reservas del usuario
    this.cargarReservas();
  }

  cargarReservas() {
    // Pedimos a la API las reservas del usuario
    this.reservaService.obtenerMisReservas().subscribe(
      (data: any) => {
        console.log("Reservas recibidas:", data);

        // Actualizamos las opciones del calendario agregando los eventos
        this.calendarOptions = {
          ...this.calendarOptions,
          events: data.map((res: any) => ({
            // El texto que aparece en la fecha será el título del evento
            title: res.evento.titulo,
            // La fecha del evento viene de la reserva
            date: res.evento.fecha,
            // Si está cancelada la pintamos gris, si no en verde
            backgroundColor: res.estado === 'Cancelada' ? '#777' : '#28a745',
            borderColor: '#000' // Borde negro nomás
          }))
        };
      },
      (error) => {
        // Si falla la petición lo mostramos por consola
        console.error("Error cargando reservas:", error);
      }
    );
  }

}




