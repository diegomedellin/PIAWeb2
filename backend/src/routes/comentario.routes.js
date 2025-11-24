// backend/src/routes/comentario.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/comentario.controller");
const auth = require("../middlewares/auth.middleware");

// Lista comentarios de un evento
router.get("/:eventoId", ctrl.listarPorEvento);

// Crear comentario (requiere login)
router.post("/:eventoId", auth, ctrl.crearComentario);

// Responder comentario (requiere login)
router.post("/responder/:comentarioId", auth, ctrl.responderComentario);

module.exports = router;
