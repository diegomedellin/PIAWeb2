import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReservaService } from '../../services/reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // Aquí guardamos la info del usuario una vez que llega del backend
  usuario: any = null;

  // Para mostrar un loader si quieres
  cargando = true;

  // Lista de reservas del usuario
  reservas: any[] = [];

  // Aquí guardamos la imagen en formato seguro para Angular
  fotoSegura: SafeUrl = '';

  constructor(
    private http: HttpClient,               // Para llamar al backend directo
    private sanitizer: DomSanitizer,        // Para mostrar imágenes de forma segura
    private reservaService: ReservaService  // Servicio que maneja reservas
  ) {}

  ngOnInit() {
    // Al cargar el componente, pedimos los datos del usuario y sus reservas
    this.cargarPerfil();
    this.cargarReservas();
  }

  cargarPerfil() {
    // Petición al backend para obtener los datos del usuario loggeado
    this.http.get('http://localhost:4000/api/usuarios/me')
      .subscribe((data: any) => {
        this.usuario = data;

        // Si el usuario ya tiene foto guardada, la sanitizamos para mostrarla
        if (data.foto) {
          this.fotoSegura = this.sanitizer.bypassSecurityTrustUrl(data.foto);
        }
      });
  }

  cargarReservas() {
    // Pedimos todas las reservas del usuario
    this.reservaService.obtenerMisReservas().subscribe({
      next: (data: any) => {
        this.reservas = data; // Las guardamos para mostrarlas en pantalla
      },
      error: (err) => {
        console.error("Error cargando reservas", err);
      }
    });
  }

  cambiarFoto(event: any) {
    // Leemos el archivo que subió el usuario
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Guardamos la foto en el modelo del usuario
      this.usuario.foto = reader.result;

      // Y también la sanitizamos para poder mostrarla
      this.fotoSegura = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    };

    reader.readAsDataURL(archivo);
  }

  guardarCambios() {
    // Armamos el cuerpo que queremos enviar al backend
    const body = {
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      ciudad: this.usuario.ciudad,
      foto: this.usuario.foto
    };

    // Hacemos la petición PUT al backend
    this.http.put('http://localhost:4000/api/usuarios/me', body)
      .subscribe({
        next: (data) => {
          this.usuario = data; // Actualizamos el usuario en pantalla

          Swal.fire({
            icon: 'success',
            title: 'Perfil actualizado',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error("Error actualizando perfil:", err);

          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar perfil',
            text: 'Intenta más tarde.'
          });
        }
      });
  }

  cancelar(id: string) {
    // Confirmación básica antes de cancelar una reserva
    Swal.fire({
      icon: 'warning',
      title: '¿Cancelar esta reserva?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then(result => {
      if (!result.isConfirmed) return;

      // Llamamos al backend para cancelar la reserva
      this.reservaService.cancelarReserva(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Reserva cancelada',
            showConfirmButton: false,
            timer: 1500
          });

          // Recargamos la lista de reservas
          this.cargarReservas();
        },
        error: err => {
          console.error(err);

          Swal.fire({
            icon: 'error',
            title: 'Error al cancelar reserva',
            text: 'Intenta nuevamente.'
          });
        }
      });
    });
  }

}



