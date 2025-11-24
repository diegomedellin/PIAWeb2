import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { ElementComponent } from './pages/element/element.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
{path:'',redirectTo: 'inicio', pathMatch: 'full'},
{path:'inicio',component:DashboardComponent},
{
  path: 'registro',
  loadComponent: () =>
    import('./pages/register/register.component')
    .then(m => m.RegisterComponent)
},
{path:'iniciar-sesion',component:LoginComponent},
{path:'buscar',component:SearchComponent},
{path:'elemento',component:ElementComponent},
{
  path: 'admin/eventos',
  loadComponent: () => import('./pages/admin-eventos/admin-eventos.component')
      .then(m => m.AdminEventosComponent)
},
{
  path: 'element/:id',
  loadComponent: () => import('./pages/element/element.component').then(m => m.ElementComponent)
},
{path:'categorias',component:CategoriasComponent},
{
  path: 'perfil',
  loadComponent: () =>
    import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
},
{ path: 'calendario',
  loadComponent: () =>
    import('./pages/calendario/calendario.component')
      .then(m => m.CalendarioComponent)
}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
