const router = require("express").Router();
const ctrl = require("../controllers/evento.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, ctrl.crear);             // Crear evento (admin)
router.get("/", ctrl.listar);                   // Listar eventos
router.get("/:id", ctrl.obtener);               // Ver evento individual
router.put("/:id", auth, ctrl.actualizar);      // Actualizar evento
router.delete("/:id", auth, ctrl.eliminar);     // Eliminar evento

module.exports = router;
