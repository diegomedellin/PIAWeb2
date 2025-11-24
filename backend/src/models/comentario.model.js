// backend/src/models/comentario.model.js
const mongoose = require("mongoose");

const respuestaSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    texto: { type: String, required: true },
  },
  { timestamps: true }
);

const comentarioSchema = new mongoose.Schema(
  {
    evento: { type: mongoose.Schema.Types.ObjectId, ref: "Evento", required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    texto: { type: String, required: true },
    respuestas: [respuestaSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comentario", comentarioSchema);
