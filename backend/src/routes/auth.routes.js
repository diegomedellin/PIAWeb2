const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");

router.post("/registro", ctrl.registro);
router.post("/login", ctrl.login);

module.exports = router;

