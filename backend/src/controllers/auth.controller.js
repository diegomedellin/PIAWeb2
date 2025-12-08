const User = require("../models/user.model"); 
const jwt = require("jsonwebtoken");

// Función sencilla para generar un JWT.
// Recibe el usuario y devuelve un token con su id, email y rol.
// Se firma con la clave del .env y dura 8 horas.
const generarToken = (user) => {
  return jwt.sign(
    {
      id: user._id,     // ID del usuario
      email: user.email, // Email del usuario
      rol: user.rol      // Rol del usuario (admin o cliente)
    },
    process.env.JWT_SECRET, // Secreta del JWT
    { expiresIn: "8h" }     // Duración del token
  );
};

// ------------------------
//  REGISTRO DE USUARIO
// ------------------------
exports.registro = async (req, res) => {
  try {
    // Verificamos si el correo ya está registrado
    const existe = await User.findOne({ email: req.body.email });
    if (existe) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Creamos al usuario con la info recibida
    const user = await User.create(req.body);

    // Generamos el JWT de ese usuario
    const token = generarToken(user);

    // Enviamos token + datos del usuario al frontend
    res.status(201).json({ token, user });

  } catch (err) {
    console.error(err);  // Para revisar errores en consola
    res.status(500).json({ message: "Error en registro" });
  }
};

// ------------------------
//  LOGIN DE USUARIO
// ------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Datos enviados desde el front

    // Buscamos al usuario por email
    const user = await User.findOne({ email });

    // Si no existe, regresamos error
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Validamos contraseña usando el método compararPassword del modelo
    const esValido = await user.compararPassword(password);
    if (!esValido) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Si todo está bien, generamos nuevo token con el rol incluido
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        rol: user.rol   // ← IMPORTANTE: aquí va el rol para poder usarlo en el front
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Enviamos token + datos del usuario
    res.json({
      token,
      user
    });

  } catch (err) {
    // Error inesperado en el servidor
    res.status(500).json({ message: "Error en login" });
  }
};



