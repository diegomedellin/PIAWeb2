//SIN USO
const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const ciudadController = require("../controllers/ciudad.controller");

router.get("/", authMiddleware, ciudadController.listarCiudades);
router.post("/", authMiddleware, ciudadController.crearCiudad);
router.put("/:id", authMiddleware, ciudadController.actualizarCiudad);
router.delete("/:id", authMiddleware, ciudadController.eliminarCiudad);

module.exports = router;
