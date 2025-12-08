// backend/src/controllers/comentario.controller.js
const Comentario = require("../models/comentario.model");

// GET /api/comentarios/:eventoId
exports.listarPorEvento = async (req, res) => {
  try {
    const { eventoId } = req.params; // id del evento, viene directo de la URL

    // buscamos comentarios del evento y de paso populamos los datos del usuario
    const comentarios = await Comentario.find({ evento: eventoId })
      .populate("usuario", "nombre email") // para no mandar el usuario entero
      .populate("respuestas.usuario", "nombre email") // idem pero para las respuestas
      .sort({ createdAt: -1 }); // ordenamos de más nuevo a más viejo

    res.json(comentarios); // regresamos todo al frontend
  } catch (err) {
    console.error(err); // si algo revienta lo vemos aquí
    res.status(500).json({ message: "Error obteniendo comentarios" });
  }
};

// POST /api/comentarios/:eventoId
exports.crearComentario = async (req, res) => {
  try {
    const { eventoId } = req.params; // id del evento
    const { texto } = req.body; // comentario enviado por el usuario

    // validamos que el comentario no esté vacío (típico usuario dejando solo espacios)
    if (!texto || !texto.trim()) {
      return res.status(400).json({ message: "El comentario no puede ir vacío" });
    }

    // creamos el comentario con los datos del usuario que viene del token
    const nuevo = await Comentario.create({
      evento: eventoId,
      usuario: req.user.id, // req.user viene del middleware de auth
      texto: texto.trim(),
    });

    // populamos en caso de que la versión de mongoose lo requiera
    const poblado = await nuevo
      .populate("usuario", "nombre email")
      .execPopulate?.(); // compatibilidad con versiones viejas

    res.status(201).json(poblado || nuevo); // devolvemos lo más completo que tengamos
  } catch (err) {
    console.error(err); // algo salió mal creando el comentario
    res.status(500).json({ message: "Error creando comentario" });
  }
};

// POST /api/comentarios/responder/:comentarioId
exports.responderComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params; // id del comentario al que respondemos
    const { texto } = req.body; // texto de la respuesta

    // validación rápida, otra vez que no vengan puros espacios
    if (!texto || !texto.trim()) {
      return res.status(400).json({ message: "La respuesta no puede ir vacía" });
    }

    // buscamos el comentario base
    const comentario = await Comentario.findById(comentarioId);
    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    // metemos la respuesta al arreglo
    comentario.respuestas.push({
      usuario: req.user.id, // el usuario que está respondiendo
      texto: texto.trim(),
    });

    await comentario.save(); // guardamos el cambio

    // volvemos a obtenerlo ya populado para regresarlo bonito
    const poblado = await Comentario.findById(comentarioId)
      .populate("usuario", "nombre email")
      .populate("respuestas.usuario", "nombre email");

    res.json(poblado); // respuesta final para el frontend
  } catch (err) {
    console.error(err); // error inesperado
    res.status(500).json({ message: "Error respondiendo comentario" });
  }
};

