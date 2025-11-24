// src/models/resena.model.js
const mongoose = require("mongoose");

const resenaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  evento: { type: mongoose.Schema.Types.ObjectId, ref: "Evento", required: true },
  calificacion: { type: Number, min: 1, max: 5, required: true },
  comentario: String
}, { timestamps: true });

module.exports = mongoose.model("Resena", resenaSchema);
