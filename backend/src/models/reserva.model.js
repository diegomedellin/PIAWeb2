const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    evento: { type: mongoose.Schema.Types.ObjectId, ref: "Evento", required: true },
    estado: { type: String, enum: ["Activa", "Cancelada"], default: "Activa" },
    fechaReserva: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reserva", reservaSchema);
