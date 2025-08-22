const Denuncia = require("../models/Denuncia");

exports.createDenuncia = async (req, res) => {
  try {
    const denuncia = await Denuncia.create(req.body);
    res.json(denuncia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.findAll();
    res.json(denuncias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
