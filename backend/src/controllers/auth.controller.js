const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generarToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
};

exports.registro = async (req, res) => {
  try {
    const existe = await User.findOne({ email: req.body.email });
    if (existe) return res.status(400).json({ message: "El email ya está registrado" });

    const user = await User.create(req.body);
    const token = generarToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
  console.error(err);   // ⬅ AQUÍ LO VAMOS A VER
  res.status(500).json({ message: "Error en registro" });
    } 
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const valido = await user.compararPassword(req.body.password);

    if (!valido) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = generarToken(user);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Error en login" });
  }
};


