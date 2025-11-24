const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    locacion: { type: String, required: true },

    // Aquí ya se permite la categoría como referencia real
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evento", eventoSchema);

