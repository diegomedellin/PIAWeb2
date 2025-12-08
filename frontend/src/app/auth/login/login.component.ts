import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Formulario donde guardamos los datos del login
  loginForm!: FormGroup;

  // Flag para mostrar spinner o bloquear el botón
  cargando = false;

  constructor(
    private fb: FormBuilder,   // para armar el formulario
    private router: Router,    // para redirigir al usuario
    private authService: AuthService // para hacer login al backend
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones básicas
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // correo obligatorio y con formato válido
      password: ['', [Validators.required]]                 // contraseña obligatoria
    });
  }

  onSubmit(): void {
    // Validamos antes de mandar nada al servidor
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa tu correo y contraseña.',
      });
      return;
    }

    // Activamos estado de carga
    this.cargando = true;

    // Llamamos al servicio de login
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.cargando = false;

        // Obtenemos el rol del token para decidir la navegación
        const rol = this.authService.getRol();
        console.log('ROL DETECTADO DESDE TOKEN >>>', rol);

        // Aviso bonito de que todo salió bien
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1300
        });

        // Si es admin → lo mandamos al panel
        if (this.authService.isAdmin()) {
          this.router.navigateByUrl('/admin/eventos');
        } else {
          // Si es usuario normal → al inicio
          this.router.navigateByUrl('/inicio');
        }
      },

      error: (err) => {
        this.cargando = false;

        console.error('ERROR LOGIN >>>', err);

        // Aviso de error si el backend rechaza las credenciales
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: err.error?.message || 'Verifica tus credenciales e inténtalo de nuevo.'
        });
      }
    });
  }
}





