const Ciudad = require("../models/ciudad.model");
const logger = require("../utils/logger");

exports.listarCiudades = async (req, res, next) => {
  try {
    const ciudades = await Ciudad.find();
    res.json(ciudades);
  } catch (error) {
    logger.error(`Error listando ciudades: ${error.message}`);
    next(error);
  }
};

exports.crearCiudad = async (req, res, next) => {
  try {
    const { nombre, pais, descripcion } = req.body;

    if (!nombre || !pais) {
      return res
        .status(400)
        .json({ message: "Nombre y país son obligatorios" });
    }

    const ciudad = await Ciudad.create({ nombre, pais, descripcion });
    res.status(201).json(ciudad);
  } catch (error) {
    logger.error(`Error creando ciudad: ${error.message}`);
    next(error);
  }
};

exports.actualizarCiudad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, pais, descripcion } = req.body;

    if (!nombre || !pais) {
      return res
        .status(400)
        .json({ message: "Nombre y país son obligatorios" });
    }

    const ciudad = await Ciudad.findByIdAndUpdate(
      id,
      { nombre, pais, descripcion },
      { new: true }
    );

    if (!ciudad) {
      return res.status(404).json({ message: "Ciudad no encontrada" });
    }

    res.json(ciudad);
  } catch (error) {
    logger.error(`Error actualizando ciudad: ${error.message}`);
    next(error);
  }
};

exports.eliminarCiudad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ciudad = await Ciudad.findByIdAndDelete(id);

    if (!ciudad) {
      return res.status(404).json({ message: "Ciudad no encontrada" });
    }

    res.json({ message: "Ciudad eliminada" });
  } catch (error) {
    logger.error(`Error eliminando ciudad: ${error.message}`);
    next(error);
  }
};
