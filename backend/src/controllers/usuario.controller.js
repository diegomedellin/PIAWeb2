const User = require("../models/user.model");

exports.obtenerPerfil = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo perfil" });
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    // Soporta tanto { id } como { _id } en el token
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const camposActualizables = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      ciudad: req.body.ciudad,
      foto: req.body.foto
    };

    // Filtrar campos undefined
    Object.keys(camposActualizables).forEach((key) => {
      if (camposActualizables[key] === undefined) {
        delete camposActualizables[key];
      }
    });

    const actualizado = await User.findByIdAndUpdate(
      userId,
      camposActualizables,
      {
        new: true,
        runValidators: false // no revalida enum/required en updates parciales
      }
    ).select("-password");

    if (!actualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error actualizando perfil" });
  }
};

