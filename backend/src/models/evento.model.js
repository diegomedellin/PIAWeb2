const mongoose = require("mongoose");

// Schema para los eventos que se muestran en la aplicación.
// Aquí guardamos toda la información básica del evento.
const eventoSchema = new mongoose.Schema(
  {
    // Título del evento (obligatorio)
    titulo: { type: String, required: true },

    // Descripción breve o detallada del evento
    descripcion: { type: String, required: true },

    // URL de la imagen que se muestra en la tarjeta/detalle
    imagen: { type: String, required: true },

    // Fecha del evento (guardada como string por simplicidad)
    fecha: { type: String, required: true },

    // Hora del evento
    hora: { type: String, required: true },

    // Lugar donde se llevará a cabo
    locacion: { type: String, required: true },

    // Categoría relacionada (opcional, pero referenciada)
    // Guarda un ObjectId que apunta al modelo "Categoria"
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  },
  {
    // Agrega automáticamente createdAt y updatedAt
    timestamps: true
  }
);

// Exportamos el modelo para usarlo en controladores
module.exports = mongoose.model("Evento", eventoSchema);

