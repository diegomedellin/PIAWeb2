import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';

  cards = [
    {
      title: 'Sabores del Mundo y de México',
      text: 'Un recorrido culinario con platillos típicos de todo el mundo combinados con ingredientes mexicanos.',
      image: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
      btn: 'Explorar',
      color: 'btn-success'
    },
    {
      title: 'Colores del Fútbol',
      text: 'Taller de arte y artesanías donde podrás crear souvenirs del Mundial.',
      image: 'https://images.unsplash.com/photo-1511843511279-cfd764c09659?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Reservar',
      color: 'btn-danger'
    },
    {
      title: 'Baila el Mundo',
      text: 'Aprende danzas internacionales como salsa, cumbia, tango y samba.',
      image: 'https://plus.unsplash.com/premium_photo-1681492529719-a1d3d8cc498a?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      btn: 'Unirme',
      color: 'btn-outline-success'
    }
  ];

  get filteredCards() {
    if (!this.query) return this.cards;
    return this.cards.filter(card =>
      card.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }
}
