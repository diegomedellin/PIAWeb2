import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor], // 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;

  cards = [
    {
      title: 'Sabores del Mundo y de México” - Feria Gastronómica Internacional',
      text: 'Un recorrido culinario donde chefs locales e internacionales preparan platillos típicos de sus países, combinados con ingredientes mexicanos. Los visitantes podrán degustar tacos de diferentes regiones, probar arepas, empanadas, y aprender recetas tradicionales en talleres de cocina.',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Explorar',
      color: 'btn-success'
    },
    {
      title: 'Colores del Fútbol” - Taller de Arte y Artesanías',
      text: 'Los asistentes podrán crear su propio souvenir del Mundial, decorando máscaras, alebrijes o piñatas con los colores de su selección favorita. Artesanos locales enseñarán técnicas tradicionales como el papel maché, la cerámica y la pintura textil.',
      image: 'https://images.unsplash.com/photo-1511843511279-cfd764c09659?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Reservar',
      color: 'btn-danger'
    },
    {
      title: 'Baila el Mundo” - Taller de Danzas y Ritmos Internacionales',
      text: 'Una experiencia multicultural donde los visitantes aprenden pasos de salsa, cumbia, tango, samba y otros ritmos latinoamericanos. Instructores de distintas nacionalidades enseñarán el significado cultural de cada danza.',
      image: 'https://plus.unsplash.com/premium_photo-1681492529719-a1d3d8cc498a?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Reservar',
      color: 'btn-danger'
    },
    {
      title: '“Raíces y Pasiones” - Festival de Cultura y Tradición',
      text: 'Un evento que combina teatro, música tradicional, desfiles folklóricos y presentaciones regionales. Cada día se dedicará a un estado o país invitado, mostrando su identidad cultural junto con el espíritu del Mundial.',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Explorar',
      color: 'btn-success'
    },
    {
      title: '“Rutas del Mundial” - Recorridos Turísticos Temáticos',
      text: 'Tours guiados por ciudades sede del Mundial 2026 con paradas en lugares icónicos, estadios, museos, zonas arqueológicas y puntos culturales.',
      image: 'https://images.unsplash.com/photo-1714070706108-7a6413c11e68?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Unirme',
      color: 'btn-outline-success'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
