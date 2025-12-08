const User = require("../models/user.model");

// ------------------------------
//   OBTENER PERFIL DEL USUARIO
// ------------------------------
exports.obtenerPerfil = async (req, res) => {
  try {
    // El middleware auth mete el usuario en req.user.
    // A veces viene como id, a veces como _id dependiendo del JWT.
    const userId = req.user.id || req.user._id;

    // Si por alguna razón no viene, no está autenticado.
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // Buscamos al usuario y eliminamos el campo password por seguridad
    const user = await User.findById(userId).select("-password");

    // Si no existe, regresamos 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Todo bien → regresamos el perfil
    res.json(user);

  } catch (err) {
    console.error(err); // muestra el error en consola
    res.status(500).json({ message: "Error obteniendo perfil" });
  }
};


// ------------------------------
//      ACTUALIZAR PERFIL
// ------------------------------
exports.actualizarPerfil = async (req, res) => {
  try {
    // Igual que arriba, obtenemos el ID desde el token
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // Campos que sí permitimos actualizar desde el front
    const camposActualizables = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      ciudad: req.body.ciudad,
      foto: req.body.foto
    };

    // Quitamos los campos que no llegaron (undefined)
    // para evitar que sobreescriban datos con undefined
    Object.keys(camposActualizables).forEach((key) => {
      if (camposActualizables[key] === undefined) {
        delete camposActualizables[key];
      }
    });

    // Actualizamos al usuario
    const actualizado = await User.findByIdAndUpdate(
      userId,
      camposActualizables,
      {
        new: true,        // devuelve el usuario ya actualizado
        runValidators: false // desactiva validaciones estrictas del schema
      }
    ).select("-password"); // otra vez quitamos el password

    // Si no existe el usuario
    if (!actualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Todo ok → regresamos el nuevo perfil
    res.json(actualizado);

  } catch (err) {
    console.error(err); // log de error en consola
    res.status(500).json({ message: "Error actualizando perfil" });
  }
};


