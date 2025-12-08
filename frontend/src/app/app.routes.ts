import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { ElementComponent } from './pages/element/element.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { NgModule } from '@angular/core';
import { AdminGuard } from './guards/admin.guard';

// Aquí definimos todas las rutas principales del frontend
export const routes: Routes = [
  // Ruta por defecto, manda a "inicio"
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // Página principal (dashboard)
  { path: 'inicio', component: DashboardComponent },

  // Registro usando carga diferida (lazy load)
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/register/register.component')
        .then(m => m.RegisterComponent)
  },

  // Pantalla de login
  { path: 'iniciar-sesion', component: LoginComponent },

  // Buscador (aunque no se use, aquí está)
  { path: 'buscar', component: SearchComponent },

  // Página de un elemento random (no la que usa ID)
  { path: 'elemento', component: ElementComponent },

  // Panel de admin — protegido con AdminGuard
  {
    path: 'admin/eventos',
    canActivate: [AdminGuard], // Solo administradores pueden entrar
    loadComponent: () =>
      import('./pages/admin-eventos/admin-eventos.component')
        .then(m => m.AdminEventosComponent)
  },

  // Vista detallada de un evento según su ID
  {
    path: 'element/:id',
    loadComponent: () =>
      import('./pages/element/element.component')
        .then(m => m.ElementComponent)
  },

  // Pantalla de categorías
  { path: 'categorias', component: CategoriasComponent },

  // Perfil del usuario (lazy load)
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil/perfil.component')
        .then(m => m.PerfilComponent)
  },

  // Calendario (lazy load igual)
  {
    path: 'calendario',
    loadComponent: () =>
      import('./pages/calendario/calendario.component')
        .then(m => m.CalendarioComponent)
  }
];

// Módulo de rutas — lo típico para Angular
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

