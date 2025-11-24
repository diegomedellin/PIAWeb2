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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: []
  };

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.obtenerMisReservas().subscribe(
      (data: any) => {
        console.log("Reservas recibidas:", data);

        this.calendarOptions = {
          ...this.calendarOptions,
          events: data.map((res: any) => ({
            title: res.evento.titulo,
            date: res.evento.fecha,
            backgroundColor: res.estado === 'Cancelada' ? '#777' : '#28a745',
            borderColor: '#000'
          }))
        };
      },
      (error) => {
        console.error("Error cargando reservas:", error);
      }
    );
  }



}



