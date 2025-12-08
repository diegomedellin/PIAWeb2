const jwt = require("jsonwebtoken");

// Middleware para verificar el token en todas las rutas protegidas
module.exports = (req, res, next) => {
  
  // El token debe venir en el header Authorization
  const header = req.headers.authorization;

  // Si no viene, no dejamos continuar
  if (!header) return res.status(401).json({ message: "Token requerido" });

  try {
    // Separar el formato "Bearer token"
    const token = header.split(" ")[1];

    // Verificamos que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos los datos del usuario dentro del request
    req.user = decoded;

    // Continuamos a la siguiente función o controlador
    next();

  } catch {
    // Si falla la verificación, el token no sirve
    res.status(401).json({ message: "Token inválido" });
  }
};

