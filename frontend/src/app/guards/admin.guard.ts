import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  // Esta función decide si el usuario puede entrar o no a la ruta protegida
  canActivate(): boolean {

    // Si el usuario está loggeado Y además su rol es admin, entonces lo dejamos pasar
    if (this.auth.isLogged() && this.auth.isAdmin()) {
      return true;
    }

    // Si no es admin o ni siquiera está loggeado, lo mandamos a la página de inicio
    this.router.navigate(['/inicio']);
    return false;
  }
}

