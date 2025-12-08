const Evento = require("../models/evento.model");
const Reserva = require("../models/reserva.model"); 

// Crear un evento
exports.crear = async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json(evento);
  } catch (err) {
    res.status(500).json({ message: "Error al crear evento" });
  }
};

// Obtener todos los eventos
exports.listar = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: "Error al listar eventos" });
  }
};

// Obtener un solo evento por ID
exports.obtener = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    res.json(evento);
  } catch (err) {
    res.status(404).json({ message: "Evento no encontrado" });
  }
};

// Actualizar evento
exports.actualizar = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(evento);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar" });
  }
};

// Eliminar evento
// Eliminar evento + sus reservas asociadas
exports.eliminar = async (req, res) => {
  try {
    const idEvento = req.params.id;

    // 1️⃣ Borrar todas las reservas que apunten a este evento
    await Reserva.deleteMany({ evento: idEvento });

    // 2️⃣ Borrar el evento
    const eliminado = await Evento.findByIdAndDelete(idEvento);

    if (!eliminado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json({ message: "Evento y reservas asociadas eliminados" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar" });
  }
};



