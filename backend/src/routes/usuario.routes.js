const router = require("express").Router();
const ctrl = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth.middleware");

// Ruta para obtener el perfil del usuario autenticado.
// Se usa el middleware "auth" para asegurarnos de que el usuario tenga un token válido.
router.get("/me", auth, ctrl.obtenerPerfil);

// Ruta para actualizar el perfil del usuario.
// También requiere estar autenticado.
// El controlador actualiza solo los campos permitidos.
router.put("/me", auth, ctrl.actualizarPerfil);

// Exportamos el router para que pueda usarse en app.js / server.js
module.exports = router;

