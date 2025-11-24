const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(morgan("dev"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuarios", require("./routes/usuario.routes"));
app.use("/api/eventos", require("./routes/evento.routes"));
app.use("/api/reservas", require("./routes/reserva.routes"));
app.use("/api/eventos", require("./routes/evento.routes"));
app.use("/api/comentarios", require("./routes/comentario.routes"));
app.use("/api/categorias", require("./routes/categoria.routes"));


app.use(errorMiddleware);

module.exports = app;

