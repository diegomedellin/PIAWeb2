export interface Evento {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
  hora: string;
  locacion: string;
  categoria?: string; 
}
