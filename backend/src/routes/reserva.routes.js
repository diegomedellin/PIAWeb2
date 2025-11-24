const router = require("express").Router();
const ctrl = require("../controllers/reserva.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, ctrl.crear); // Crear reserva
router.get("/mine", auth, ctrl.misReservas); // Ver mis reservas
router.put("/cancel/:id", auth, ctrl.cancelar); // Cancelar reserva

module.exports = router;
