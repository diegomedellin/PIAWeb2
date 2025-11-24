const Categoria = require("../models/categoria.model");
const Evento = require("../models/evento.model");

exports.crearCategoria = async (req, res) => {
  try {
    const nueva = await Categoria.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(500).json({ message: "Error creando categoría" });
  }
};

exports.obtenerCategorias = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};

exports.obtenerEventosPorCategoria = async (req, res) => {
  const categoriaId = req.params.id;
  const eventos = await Evento.find({ categoria: categoriaId });
  res.json(eventos);
};
