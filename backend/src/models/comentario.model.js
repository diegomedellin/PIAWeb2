// Importamos mongoose para poder armar los esquemas y modelos
const mongoose = require("mongoose");

// --------------------------------------
//   SUB-SCHEMA: Respuestas a comentarios
// --------------------------------------
// Este esquema representa cada respuesta dentro de un comentario.
// No se crea como modelo independiente; solo se incrusta en comentarios.
const respuestaSchema = new mongoose.Schema(
  {
    // Usuario que responde
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Texto de la respuesta
    texto: {
      type: String,
      required: true
    },
  },
  {
    // timestamps agrega createdAt y updatedAt automáticamente
    timestamps: true
  }
);

// --------------------------------------
//       SCHEMA PRINCIPAL: Comentarios
// --------------------------------------
// Cada comentario está ligado a un evento y a un usuario.
// Además, contiene un arreglo de respuestas usando el schema anterior.
const comentarioSchema = new mongoose.Schema(
  {
    // Evento al que pertenece el comentario
    evento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evento",
      required: true
    },

    // Usuario que escribió el comentario
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Texto del comentario
    texto: {
      type: String,
      required: true
    },

    // Respuestas incrustadas (subdocumentos)
    respuestas: [respuestaSchema],
  },
  {
    // timestamps -> agrega createdAt y updatedAt
    timestamps: true
  }
);

// Exportamos el modelo ya listo para usar
module.exports = mongoose.model("Comentario", comentarioSchema);
