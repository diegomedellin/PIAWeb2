const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");

// Ruta para registrar un usuario nuevo.
// Aquí simplemente mandamos la petición al controlador.
router.post("/registro", ctrl.registro);

// Ruta para iniciar sesión.
// El controlador se encarga de validar credenciales y generar el token.
router.post("/login", ctrl.login);

// Exportamos el router para usarlo en app.js / index.js
module.exports = router;

