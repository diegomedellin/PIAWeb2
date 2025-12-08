//SIN USO
const mongoose = require("mongoose");

const lugarSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true },
    direccion: String,
    descripcion: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lugar", lugarSchema);
