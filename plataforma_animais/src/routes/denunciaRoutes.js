const express = require("express");
const router = express.Router();
const Denuncia = require("../models/Denuncia");

router.get("/", async (req, res) => {
  const denuncias = await Denuncia.findAll();
  res.json(denuncias);
});

router.post("/", async (req, res) => {
  const nova = await Denuncia.create(req.body);
  res.json(nova);
});

module.exports = router;
