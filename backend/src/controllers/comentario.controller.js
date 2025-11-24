// backend/src/controllers/comentario.controller.js
const Comentario = require("../models/comentario.model");

// GET /api/comentarios/:eventoId
exports.listarPorEvento = async (req, res) => {
  try {
    const { eventoId } = req.params;

    const comentarios = await Comentario.find({ evento: eventoId })
      .populate("usuario", "nombre email")
      .populate("respuestas.usuario", "nombre email")
      .sort({ createdAt: -1 });

    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo comentarios" });
  }
};

// POST /api/comentarios/:eventoId
exports.crearComentario = async (req, res) => {
  try {
    const { eventoId } = req.params;
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({ message: "El comentario no puede ir vacío" });
    }

    const nuevo = await Comentario.create({
      evento: eventoId,
      usuario: req.user.id,
      texto: texto.trim(),
    });

    const poblado = await nuevo
      .populate("usuario", "nombre email")
      .execPopulate?.(); // por compatibilidad

    res.status(201).json(poblado || nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creando comentario" });
  }
};

// POST /api/comentarios/responder/:comentarioId
exports.responderComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params;
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({ message: "La respuesta no puede ir vacía" });
    }

    const comentario = await Comentario.findById(comentarioId);
    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    comentario.respuestas.push({
      usuario: req.user.id,
      texto: texto.trim(),
    });

    await comentario.save();

    const poblado = await Comentario.findById(comentarioId)
      .populate("usuario", "nombre email")
      .populate("respuestas.usuario", "nombre email");

    res.json(poblado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error respondiendo comentario" });
  }
};
