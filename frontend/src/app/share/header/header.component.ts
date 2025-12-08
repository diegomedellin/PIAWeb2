import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public auth: AuthService,   // servicio de autenticación para saber si el usuario está loggeado y su rol
    private router: Router       // router para movernos entre pantallas
  ) {}

  // Cierra la sesión del usuario y lo manda al login
  logout() {
    this.auth.logout();
    this.router.navigate(['/iniciar-sesion']);
  }

  // Revisa si hay token guardado → o sea, si el usuario está loggeado
  isLogged() {
    return this.auth.isLogged();
  }

  // Checa si el usuario activo tiene rol de admin (según el token)
  isAdmin() {
    return this.auth.isAdmin();
  }

}


