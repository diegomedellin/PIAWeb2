const router = require("express").Router();
const ctrl = require("../controllers/usuario.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/me", auth, ctrl.obtenerPerfil);

// NUEVA RUTA
router.put("/me", auth, ctrl.actualizarPerfil);

module.exports = router;
