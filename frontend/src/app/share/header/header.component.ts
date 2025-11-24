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
    public auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();       // elimina token
    this.router.navigate(['/iniciar-sesion']);  // redirige
  }
}

