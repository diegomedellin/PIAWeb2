import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './share/header/header.component'; // importa tu componente
import { FooterComponent } from './share/footer/footer.component'; // importa tu componente
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,        // importante
  imports: [HeaderComponent, FooterComponent, DashboardComponent, RouterOutlet, ReactiveFormsModule]  
  // aquí declaras los componentes que usarás en tu template
})
export class AppComponent {
  title = 'frontend';
}
