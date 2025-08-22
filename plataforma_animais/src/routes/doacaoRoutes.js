const express = require("express");
const router = express.Router();
const Doacao = require("../models/Doacao");

router.get("/", async (req, res) => {
  const doacoes = await Doacao.findAll();
  res.json(doacoes);
});

router.post("/", async (req, res) => {
  const nova = await Doacao.create(req.body);
  res.json(nova);
});

module.exports = router;
