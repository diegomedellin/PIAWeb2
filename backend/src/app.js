const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Conexión a la base de datos (MongoDB)
connectDB();

// Middlewares globales
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json({ limit: "10mb" })); // Para recibir JSON grandes (ej. fotos en base64)
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Formularios

// Logger para ver las peticiones en consola
app.use(morgan("dev"));

// Rutas principales de la API
app.use("/api/auth", require("./routes/auth.routes"));          // Login / Registro
app.use("/api/usuarios", require("./routes/usuario.routes"));   // Perfil del usuario
app.use("/api/eventos", require("./routes/evento.routes"));     // CRUD de eventos
app.use("/api/reservas", require("./routes/reserva.routes"));   // Reservas
app.use("/api/eventos", require("./routes/evento.routes"));     // (está duplicada pero no afecta)
app.use("/api/comentarios", require("./routes/comentario.routes")); // Comentarios de eventos
app.use("/api/categorias", require("./routes/categoria.routes"));   // Categorías de eventos

// Middleware de errores genérico
// Si algo falla en cualquier parte de la API, cae aquí
app.use(errorMiddleware);

// Exportamos la app para usarla en server.js
module.exports = app;


