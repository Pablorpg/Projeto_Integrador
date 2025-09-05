const Doacao = require("../models/doacaoModel.js");

exports.createDoacao = async (req, res) => {
  try {
    const doacao = await Doacao.create(req.body);
    res.json(doacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDoacoes = async (req, res) => {
  try {
    const doacoes = await Doacao.findAll();
    res.json(doacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
