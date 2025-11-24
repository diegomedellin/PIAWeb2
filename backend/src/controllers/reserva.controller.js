const Reserva = require("../models/reserva.model");

// Crear reserva
exports.crear = async (req, res) => {
  try {
    const nueva = await Reserva.create({
      usuario: req.user.id,
      evento: req.body.evento
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
