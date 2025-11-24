import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Por favor completa correctamente el formulario.');
      return;
    }

    const { confirmPassword, ...data } = this.registerForm.value;

    this.cargando = true;

    this.authService.registro(data).subscribe({
      next: () => {
        this.cargando = false;
        alert('¡Registro exitoso!');
        this.router.navigateByUrl('/iniciar-sesion'); // 🔹 ruta correcta
      },
      error: (err) => {
        this.cargando = false;
        alert(err.error?.message || 'Error al registrar usuario');
      }
    });
  }
}

