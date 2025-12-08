const mongoose = require("mongoose");

// Schema para guardar las reservas que hacen los usuarios.
// Aquí básicamente se relaciona un usuario con un evento.
const reservaSchema = new mongoose.Schema(
  {
    // Usuario que hizo la reserva (referencia al modelo User)
    usuario: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    // Evento reservado (referencia al modelo Evento)
    evento: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Evento", 
      required: true 
    },

    // Estado de la reserva: puede estar activa o cancelada.
    // Por defecto siempre se crea como "Activa"
    estado: { 
      type: String, 
      enum: ["Activa", "Cancelada"], 
      default: "Activa" 
    },

    // Fecha en la que se hizo la reserva (por defecto usa la fecha actual)
    fechaReserva: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    // Agrega automáticamente createdAt y updatedAt
    timestamps: true
  }
);

// Exportamos el modelo para usarlo en controladores
module.exports = mongoose.model("Reserva", reservaSchema);
