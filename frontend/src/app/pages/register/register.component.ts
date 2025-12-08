import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true, // Componente independiente, no depende de un módulo
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Aquí guardamos el formulario completo
  registerForm!: FormGroup;

  // Variable para mostrar estado de carga
  cargando = false;

  constructor(
    private fb: FormBuilder, // Para crear el formulario reactivo
    private router: Router,  // Para navegar después del registro
    private authService: AuthService // Para hacer la petición al backend
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario con sus campos y validaciones
    this.registerForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: [''],
        email: ['', [Validators.required, Validators.email]],
        telefono: [''],
        ciudad: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      // Validación personalizada para comparar passwords
      { validators: this.passwordMatchValidator }
    );
  }

  // Validador simple para verificar que ambas contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null   // Todo bien
      : { mismatch: true }; // Error
  }

  onSubmit(): void {
    // Si el formulario es inválido mostramos un aviso
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa correctamente el formulario.'
      });
      return;
    }

    // Quitamos confirmPassword para no enviarlo al backend
    const { confirmPassword, ...data } = this.registerForm.value;

    this.cargando = true; // Activamos el estado de carga

    // Llamamos al servicio para registrar al usuario
    this.authService.registro(data).subscribe({
      next: () => {
        this.cargando = false;

        // Mensaje bonito cuando todo sale bien
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puedes iniciar sesión con tu cuenta.',
          confirmButtonText: 'Ir a iniciar sesión'
        }).then(() => {
          // Enviamos al usuario al login
          this.router.navigateByUrl('/iniciar-sesion');
        });
      },
      error: (err) => {
        this.cargando = false;

        // Si hay error mostramos el mensaje del backend o uno genérico
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar usuario',
          text: err.error?.message || 'Intenta de nuevo más tarde.'
        });
      }
    });
  }
}



