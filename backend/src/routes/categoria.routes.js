//SIN USO
const router = require("express").Router();
const ctrl = require("../controllers/categoria.controller");

router.post("/", ctrl.crearCategoria);
router.get("/", ctrl.obtenerCategorias);
router.get("/:id/eventos", ctrl.obtenerEventosPorCategoria);

module.exports = router;
