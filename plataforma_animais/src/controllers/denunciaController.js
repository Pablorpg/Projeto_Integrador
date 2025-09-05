const express = require("express");
const router = express.Router();
const denunciaController = require("../controllers/denunciaController");

router.get("/", denunciaController.getDenuncias);
router.post("/", denunciaController.createDenuncia);

module.exports = router;
