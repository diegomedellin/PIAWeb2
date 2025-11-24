import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReservaService } from '../../services/reservas.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = null;
  cargando = true;
  reservas: any[] = [];

  fotoSegura: SafeUrl = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.cargarPerfil();
    this.cargarReservas();
  }

  cargarPerfil() {
    this.http.get('http://localhost:4000/api/usuarios/me')
      .subscribe((data: any) => {
        this.usuario = data;

        if (data.foto) {
          this.fotoSegura = this.sanitizer.bypassSecurityTrustUrl(data.foto);
        }
      });
  }

  cargarReservas() {
    this.reservaService.obtenerMisReservas().subscribe({
      next: (data: any) => {
        this.reservas = data;
      },
      error: (err) => {
        console.error("Error cargando reservas", err);
      }
    });
  }

  cambiarFoto(event: any) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.usuario.foto = reader.result;
      this.fotoSegura = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    };

    reader.readAsDataURL(archivo);
  }

  guardarCambios() {
    const body = {
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      ciudad: this.usuario.ciudad,
      foto: this.usuario.foto
    };

    this.http.put('http://localhost:4000/api/usuarios/me', body)
      .subscribe({
        next: (data) => {
          alert("Perfil actualizado correctamente");
          this.usuario = data;
        },
        error: (err) => {
          console.error("Error actualizando perfil:", err);
          alert("Error actualizando perfil");
        }
      });
  }

  // ✅ AHORA SÍ: correctamente fuera de guardarCambios()
  cancelar(id: string) {
  if(!confirm("¿Cancelar esta reserva?")) return;

  this.reservaService.cancelarReserva(id).subscribe({
    next: () => {
      alert("Reserva cancelada");
      this.cargarReservas(); // refrescar la lista
    },
    error: err => {
      console.error(err);
      alert("Error al cancelar reserva");
    }
  });
  }


}

