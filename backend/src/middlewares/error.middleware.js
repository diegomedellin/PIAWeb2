// Middleware simple para manejar errores generales del servidor
module.exports = (err, req, res, next) => {

  // Mostramos el error completo en consola (útil en desarrollo)
  console.log(err);

  // Respondemos con un error genérico al cliente
  res.status(500).json({ message: "Error interno del servidor" });
};

