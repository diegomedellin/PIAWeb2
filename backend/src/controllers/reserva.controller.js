const Reserva = require("../models/reserva.model");

// Crear reserva
// Crear reserva
exports.crear = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const eventoId = req.body.evento;

    if (!eventoId) {
      return res.status(400).json({ message: "Evento requerido" });
    }

    // Verificar si ya existe una reserva ACTIVA para este usuario y evento
    const yaExiste = await Reserva.findOne({
      usuario: usuarioId,
      evento: eventoId,
      estado: "Activa"
    });

    if (yaExiste) {
      return res.status(400).json({
        message: "Ya tienes una reserva activa para este evento."
      });
    }

    // Crear la reserva si no existe una activa
    const nueva = await Reserva.create({
      usuario: usuarioId,
      evento: eventoId
    });

    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear reserva" });
  }
};



// Obtener reservas del usuario
exports.misReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.user.id })
      .populate("evento");

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// Cancelar reserva
exports.cancelar = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { estado: "Cancelada" },
      { new: true }
    );

    res.json(reserva);
  } catch (err) {
    res.status(500).json({ message: "Error al cancelar reserva" });
  }
};
